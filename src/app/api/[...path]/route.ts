import { NextRequest, NextResponse } from "next/server";

const backendBaseUrl =
  process.env.BACKEND_URL?.replace(/\/$/, "") || "http://localhost:8086";

type RouteParams = { path?: string[] };
type RouteContext = { params: RouteParams | Promise<RouteParams> };

async function proxyRequest(request: NextRequest, paramsInput: RouteParams | Promise<RouteParams>) {
  const resolvedParams = await Promise.resolve(paramsInput);
  const pathSegments = Array.isArray(resolvedParams?.path)
    ? resolvedParams.path
    : [];

  const targetPath = pathSegments.join("/");
  const search = request.nextUrl.search || "";
  const backendUrl = `${backendBaseUrl}/api/${targetPath}${search}`;

  // Clone headers and drop forbidden ones
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const isBodyAllowed = request.method !== "GET" && request.method !== "HEAD";

  const requestInit: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (isBodyAllowed) {
    requestInit.body = request.body;
    // Required when sending a ReadableStream body with fetch in Node/Undici
    (requestInit as any).duplex = "half";
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(backendUrl, {
      ...requestInit,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Upstream API request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers(backendResponse.headers);
  const setCookie = backendResponse.headers.get("set-cookie");

  const nextResponse = new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    headers: responseHeaders,
  });

  if (setCookie) {
    nextResponse.headers.set("set-cookie", setCookie);
  }

  return nextResponse;
}

const createHandler =
  (method: string) =>
  (request: NextRequest, context: RouteContext) =>
    proxyRequest(request, context.params);

export const GET = createHandler("GET");
export const POST = createHandler("POST");
export const PUT = createHandler("PUT");
export const PATCH = createHandler("PATCH");
export const DELETE = createHandler("DELETE");
export const OPTIONS = createHandler("OPTIONS");

export const dynamic = "force-dynamic";

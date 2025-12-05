import type { Metadata } from "next";
import { Providers } from "./(dashboard)/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rider Operations Dashboard",
  description: "Manage riders and daily operations with clarity.",
  icons: {
    icon: "/icons/Asset 34.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body
        className="antialiased bg-[#f7f8fa] text-[#131a2a] font-sans h-full overflow-hidden"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

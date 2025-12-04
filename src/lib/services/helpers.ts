import type { AppDispatch } from "@/lib/store/store";

export interface DataApiResponse<T> {
  status: number;
  data: {
    message: string;
    payload?: T;
  };
}

export interface PaginationApiResponse<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T;
}

export const handleApiRequest = async <T extends DataApiResponse<unknown>>(
  _dispatch: AppDispatch,
  apiCall: () => Promise<T>,
  onSuccess: (data: T["data"]["payload"] | null) => void,
  onError: (error: string) => void
) => {
  try {
    const response = await apiCall();

    if (response.status >= 200 && response.status < 300) {
      const { payload } = response.data;

      // Implement success message using your toast/notification system if needed
      // const { message: responseMessage } = response.data;
      // if (responseMessage) toast.success(responseMessage);

      onSuccess(payload ?? null);
    } else {
      const errorMessage =
        response.data.message ||
        `Request failed with status code ${response.status}`;
      onError(errorMessage);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    onError(errorMessage);
  }
};

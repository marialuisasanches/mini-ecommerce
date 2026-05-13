export type ApiSuccessResponse<T> = {
  data: T;
};

export function buildSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
  return {
    data,
  };
}

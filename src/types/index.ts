export type TResponse<T> = {
  error: string | null;
  data: T | null;
  success: boolean;
};

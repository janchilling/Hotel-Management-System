export interface StandardResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
}

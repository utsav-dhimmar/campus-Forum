class ApiResponse<T = any> {
  public data: T;
  public message: string;
  public success: boolean;
  public statusCode: number;

  constructor(statusCode: number, data: T, message: string) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.success = statusCode < 400;
  }
}
export default ApiResponse;

class ApiError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(statusCode: number, message: string = "something went wrong") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ApiError;

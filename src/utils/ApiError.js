// ApiError extends the native JavaScript Error class
// Used to create structured, consistent API errors
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call parent Error constructor
    super(message);

    // HTTP status code (400, 401, 500, etc.)
    this.statusCode = statusCode;

    // No data is returned in error responses
    this.data = null;

    // Explicitly mark response as failed
    this.success = false;

    // Additional error details (validation errors, etc.)
    this.errors = errors;

    /*
      Capture stack trace:
      - Use provided stack if available (rethrowing errors)
      - Otherwise, generate a clean stack trace
    */
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

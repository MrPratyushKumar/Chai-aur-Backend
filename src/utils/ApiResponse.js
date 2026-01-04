// ApiResponse is a standard structure for all successful API responses
class ApiResponse {
  constructor(statusCode, data, message = "Success") {

    // HTTP status code (200, 201, etc.)
    this.statusCode = statusCode;

    // Actual response payload
    this.data = data;

    // Human-readable message
    this.message = message;

    // Automatically determine success based on status code
    this.success = statusCode < 400;
  }
}

export { ApiResponse };

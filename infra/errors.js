export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An unexpected error occurred while processing the request.", {
      cause,
    });
    this.name = "Internal Server Error";
    this.action = "Please contact support if the problem persists.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

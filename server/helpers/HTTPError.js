const defaultStatus  = 500;   // Internal Server Error"
const defaultMessage = `Sorry, something went wrong. Please try again later. `
                     + `If the problem persists please contact support with error code 42`;

class HTTPError extends Error {
  /* @status  is the HTTP status code
   * @info    is the message intended for the developer
   * @message is the message intended for the user
   */
  constructor(status = defaultStatus, info, message = defaultMessage) {
    super(info);
    this.info = info;

    Error.captureStackTrace(this, this.constructor); // Creates log of error stack at this.stack

    this.name = this.constructor.name; // this.name === "HTTPError"

    this.status     = status;
    this.statusCode = this.status; // Just to be nice

    this.message = message;
  }

  getResObj() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

module.exports = HTTPError;

export class UserError extends Error {
  httpStatusCode: number = 400;

  constructor(message: string = "user error", httpStatusCode?: number) {
    super(message);
    Object.setPrototypeOf(this, UserError.prototype);

    if (typeof httpStatusCode !== "undefined") {
      this.httpStatusCode = httpStatusCode;
    }
  }
}

export class responseType {
  message: string;
  status: number;
  data: string | any;

  constructor(message: string = "", status: number, data?: any) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

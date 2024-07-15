export default class CustomError extends Error {
  constructor(message, code, info) {
    super(message);
    this.code = code || 500;
    this.info = info;
  }
}

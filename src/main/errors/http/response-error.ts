export class ResponseError extends Error {
  public code: number
  constructor(
    name: string,
    message: string,
    code: number = 500) {
    super(message)
    this.name = name
    this.message = message
    this.code = code
  }
}

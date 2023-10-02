import { ResponseError } from '@main/errors/http/response-error'

export class NotFoundError extends ResponseError {
  constructor(message: string) {
    super(
      'NotFoundError',
      message,
      404
    )
  }
}

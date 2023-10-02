import { ResponseError } from '@main/errors/http/response-error'

export class AuthorizationError extends ResponseError {
  constructor(message: string) {
    super(
      'AuthorizationError',
      message,
      401
    )
  }
}

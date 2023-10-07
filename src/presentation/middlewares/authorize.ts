import { tokens } from '@main/di/tokens'
import { AuthorizationError } from '@main/errors/http/authorization-error'
import { ApiResponseStatus } from '@main/types/api-response-status'
import { ValidateToken } from '@shared/auth/interfaces/validate-token'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class Authorization {
  constructor(
    @inject(tokens.AuthToken)
    private readonly token: ValidateToken
  ) {
    console.log(token)
  }
  async authorize(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.headers['access-token'] as string
      if (!accessToken)
        throw new AuthorizationError('Undefined token.')

      const user = this.token.validateToken(accessToken)
      if (!user)
        throw new AuthorizationError('Invalid token.')

      res.locals.user = user

      next()
    }
    catch (e) {
      const response = {
        code: 401,
        status: ApiResponseStatus.Error,
        message: e.message,
        stack: e.stack || '',
      }
      next(res.status(401).send(response))
    }
  }
}
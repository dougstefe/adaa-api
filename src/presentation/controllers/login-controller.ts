import { Request } from 'express'
import { BaseController } from '@main/base/base-controller'
import { ApiResponse } from '@main/types/api-response'
import { LoginSuccess } from '@domain/models/login-success'
import { inject, injectable } from 'tsyringe'
import { ResponseError } from '@main/errors/http/response-error'
import { LoginUseCase } from '@domain/user/login/login-usecase'
import { AuthorizationError } from '@main/errors/http/authorization-error'
import { tokens } from '@main/di/tokens'

@injectable()
export class LoginController extends BaseController<LoginSuccess | Error> {
  constructor(
    @inject(tokens.LoginUseCase)
    private readonly loginUseCase: LoginUseCase
  ) {
    super()
  }
  async handleRequest(req: Request): Promise<ApiResponse<LoginSuccess | Error>> {
    try {
      const { email, password } = req.body

      var response = await this.loginUseCase.execute({ email, password })

      if (!response)
        throw new AuthorizationError('Invalid user or password.')

      return this.ok(response)

    }
    catch (error) {
      const responseError = error instanceof ResponseError ? error : new ResponseError(error?.name, error.message)
      return this.error(responseError)
    }
  }
}

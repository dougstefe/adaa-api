import { Request } from 'express'
import { BaseController } from '@main/base/base-controller'
import { ApiResponse } from '@main/types/api-response'
import { inject, injectable } from 'tsyringe'
import { ResponseError } from '@main/errors/http/response-error'
import { LoginUseCase } from '@domain/user/use-cases/login/login-usecase'
import { AuthorizationError } from '@main/errors/http/authorization-error'
import { tokens } from '@main/di/tokens'
import { LoginResponse } from '@domain/user/use-cases/login/login-response'

@injectable()
export class LoginController extends BaseController<LoginResponse | Error> {
  constructor(
    @inject(tokens.LoginUseCase)
    private readonly loginUseCase: LoginUseCase
  ) {
    super()
  }
  async handleRequest(req: Request): Promise<ApiResponse<LoginResponse | Error>> {
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

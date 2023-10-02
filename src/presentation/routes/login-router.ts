import { BaseRouter } from '../../main/base/base-router'
import { HttpMethod } from '../../main/types/http-method'
import { LoginController } from '../controllers/login-controller'
import { inject, injectable } from 'tsyringe'
import { tokens } from '../../main/di/tokens'

@injectable()
export class LoginRouter extends BaseRouter {
  constructor(
    @inject(tokens.LoginController)
    private loginController: LoginController
  ) {
    super()
    this.setupRoutes()
  }

  protected async setupRoutes() {
    this.registerRoute({
      path: '/v1/login',
      method: HttpMethod.Post,
      handler: this.loginController,
      middlewares: [],
    })
  }
}
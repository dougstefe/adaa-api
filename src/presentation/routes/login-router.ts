// import { Router } from 'express'
// import { adaptRoute } from '../adapters/express-route-adapters'
// import { makeSignUpController } from '../factories/signup-factory'
import 'reflect-metadata'

import { BaseRouter } from '../../main/base/base-router'
import { HttpMethod } from '../../main/types/http-method'
import { LoginController } from '../controllers/login-controller'
import { inject, injectable } from 'tsyringe'
import { tokens } from '../../main/di/tokens'

// export default (router: Router): void => {
//   router.post('/login', adaptRoute(makeSignUpController()))
// }

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
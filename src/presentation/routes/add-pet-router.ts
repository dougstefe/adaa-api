import { BaseRouter } from '@main/base/base-router'
import { tokens } from '@main/di/tokens'
import { HttpMethod } from '@main/types/http-method'
import { AddPetController } from '@presentation/controllers/add-pet-controller'
import { Authorization } from '@presentation/middlewares/authorize'
import { inject, injectable } from 'tsyringe'

@injectable()
export class AddPetRouter extends BaseRouter {
  constructor(
    @inject(tokens.AddPetController)
    private controller: AddPetController,
    @inject(tokens.Authorization)
    private authorization: Authorization
  ) {
    super()
    this.setupRoutes()
  }

  protected async setupRoutes() {
    this.registerRoute({
      path: '/v1/pets',
      method: HttpMethod.Post,
      handler: this.controller,
      middlewares: [
        this.authorization.authorize
      ],
    })
  }
}
import { BaseRouter } from '@main/base/base-router'
import { tokens } from '@main/di/tokens'
import { HttpMethod } from '@main/types/http-method'
import { ListPetController } from '@presentation/controllers/list-pet-controller'
import { Authorization } from '@presentation/middlewares/authorize'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPetRouter extends BaseRouter {
  constructor(
    @inject(tokens.ListPetController)
    private controller: ListPetController,
    @inject(tokens.Authorization)
    private authorization: Authorization
  ) {
    super()
    this.setupRoutes()
  }

  protected async setupRoutes() {
    this.registerRoute({
      path: '/v1/pets',
      method: HttpMethod.Get,
      handler: this.controller,
      middlewares: [
        this.authorization.authorize
      ],
    })
  }
}
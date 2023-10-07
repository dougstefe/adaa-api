import { BaseRouter } from '@main/base/base-router'
import { tokens } from '@main/di/tokens'
import { HttpMethod } from '@main/types/http-method'
import { DonationController } from '@presentation/controllers/donation-controller'
import { Authorization } from '@presentation/middlewares/authorize'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DonationRouter extends BaseRouter {
  constructor(
    @inject(tokens.DonationController)
    private donationController: DonationController,
    @inject(tokens.Authorization)
    private authorization: Authorization
  ) {
    super()
    this.setupRoutes()
  }

  protected async setupRoutes() {
    this.registerRoute({
      path: '/v1/donation',
      method: HttpMethod.Post,
      handler: this.donationController,
      middlewares: [
        this.authorization.authorize
      ],
    })
  }
}
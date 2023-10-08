import { DonationUseCase } from '@domain/donation/add/donation-usecase'
import { DonationResponse } from '@domain/donation/add/models/donation-response'
import { BaseController } from '@main/base/base-controller'
import { tokens } from '@main/di/tokens'
import { ResponseError } from '@main/errors/http/response-error'
import { ApiResponse } from '@main/types/api-response'
import { inject, injectable } from 'tsyringe'
import { Request } from 'express'

@injectable()
export class DonationController extends BaseController<DonationResponse | Error> {

  constructor(
    @inject(tokens.DonationUseCase)
    private readonly donationUseCase: DonationUseCase
  ) {
    super()
  }

  async handleRequest(req: Request): Promise<ApiResponse<DonationResponse | Error>> {
    try {
      const {
        animalType,
        color,
        datebirth,
        name,
        observation
      } = req.body

      var response = await this.donationUseCase.execute({
        animalType,
        color,
        datebirth,
        name,
        observation
      })

      return this.ok(response)

    }
    catch (error) {
      const responseError = error instanceof ResponseError ? error : new ResponseError(error?.name, error.message)
      return this.error(responseError)
    }
  }
}
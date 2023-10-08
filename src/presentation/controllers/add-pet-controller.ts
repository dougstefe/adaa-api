import { AddPetUseCase } from '@domain/pet/use-cases/add/add-pet-usecase'
import { BaseController } from '@main/base/base-controller'
import { tokens } from '@main/di/tokens'
import { ResponseError } from '@main/errors/http/response-error'
import { ApiResponse } from '@main/types/api-response'
import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { AddPetResponse } from '@domain/pet/use-cases/add/add-pet-response'

@injectable()
export class AddPetController extends BaseController<AddPetResponse | Error> {

  constructor(
    @inject(tokens.AddPetUseCase)
    private readonly useCase: AddPetUseCase
  ) {
    super()
  }

  async handleRequest(req: Request, res: Response): Promise<ApiResponse<AddPetResponse | Error>> {
    try {
      const {
        type,
        color,
        datebirth,
        name,
        observation,
        images
      } = req.body

      const {
        id: userId,
        email: userEmail,
        name: userName
      } = res.locals.user

      var response = await this.useCase.execute({
        type,
        color,
        datebirth,
        name,
        observation,
        images,
        donatedBy: {
          id: userId,
          email: userEmail,
          name: userName
        }
      })

      return this.created(response)

    }
    catch (error) {
      const responseError = error instanceof ResponseError ? error : new ResponseError(error?.name, error.message)
      return this.error(responseError)
    }
  }
}
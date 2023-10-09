import { BaseController } from '@main/base/base-controller'
import { tokens } from '@main/di/tokens'
import { ResponseError } from '@main/errors/http/response-error'
import { ApiResponse } from '@main/types/api-response'
import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { PaginationResponse } from '@domain/shared/pagination/pagination-response'
import { ListPetResponse } from '@domain/pet/use-cases/list/list-pet-response'
import { ListPetUseCase } from '@domain/pet/use-cases/list/list-pet-usecase'
import { PetType } from '@domain/shared/types/pet-type'

@injectable()
export class ListPetController extends BaseController<PaginationResponse<ListPetResponse> | Error> {

  constructor(
    @inject(tokens.ListPetUseCase)
    private readonly useCase: ListPetUseCase
  ) {
    super()
  }

  async handleRequest(req: Request, res: Response): Promise<ApiResponse<PaginationResponse<ListPetResponse> | Error>> {
    try {
      const {
        type,
        from,
        size,
        sortBy,
        sortDirection
      } = req.query

      var response = await this.useCase.execute({
        filter: {
          type: type as PetType
        },
        from: Number(from),
        size: Number(size),
        sort: {
          by: String(sortBy),
          direction: String(sortDirection)
        }
      })

      return this.ok(response)

    }
    catch (error) {
      const responseError = error instanceof ResponseError ? error : new ResponseError(error?.name, error.message)
      return this.error(responseError)
    }
  }
}
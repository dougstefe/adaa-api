import { AuthorizationError } from '@main/errors/http/authorization-error'
import { ApiResponse } from '../types/api-response'
import { ApiResponseStatus } from '../types/api-response-status'
import { NextFunction, Response, Request } from 'express'
import { ResponseError } from '@main/errors/http/response-error'

export abstract class BaseController<Resource> {

  abstract handleRequest(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<Resource>>

  protected ok(data: Resource): ApiResponse<Resource> {
    return {
      code: 200,
      status: ApiResponseStatus.Success,
      data: data,
    }
  }

  protected created(data: Resource): ApiResponse<Resource> {
    return {
      code: 201,
      status: ApiResponseStatus.Success,
      data: data,
    }
  }

  protected error(error: ResponseError): ApiResponse<Resource> {
    const message = error.message || JSON.stringify(error)
    return {
      code: error.code || 500,
      status: ApiResponseStatus.Error,
      message,
      stack: error.stack || '',
    }
  }
}
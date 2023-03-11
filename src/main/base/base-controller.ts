import { ApiResponse } from '../types/api-response'
import { ApiResponseStatus } from '../types/api-response-status'
import { NextFunction, Response, Request } from 'express'

export abstract class BaseController<Resource> {

  abstract handleRequest(req: Request, res: Response, next: NextFunction): Promise<ApiResponse<Resource>>

  protected responseSuccess(data: Resource): ApiResponse<Resource> {
    return {
      code: 200,
      status: ApiResponseStatus.Success,
      data: data,
    }
  }

  protected responseError(error: Error): ApiResponse<Resource> {
    return {
      code: 400,
      status: ApiResponseStatus.Error,
      message: error.message || `${error}`,
      stack: error.stack || '',
    }
  }

  protected responseQueued(): ApiResponse<Resource> {
    return {
      code: 202,
      status: ApiResponseStatus.Queued,
      message: 'Resource queued.',
    }
  }
}
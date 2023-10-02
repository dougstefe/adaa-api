import { ApiResponse } from '@main/types/api-response'
import { ApiResponseStatus } from '@main/types/api-response-status'
import { RouteOptions } from '@main/types/route-options'
import { NextFunction, Router, Request, Response } from 'express'

export abstract class BaseRouter {
  protected readonly router: Router

  protected abstract setupRoutes(): Promise<void>

  constructor() {
    this.router = Router()
  }

  get route() {
    return this.router
  }

  protected registerRoute(payload: RouteOptions) {
    const { path, method, middlewares, handler } = payload

    async function dispatch(req: Request, res: Response, next: NextFunction) {
      const result = (await handler.handleRequest(
        req,
        res,
        next
      )) as ApiResponse<unknown>
      const response = res.status(result.code)

      if (result.status == ApiResponseStatus.Success) {
        response.send(result.data)
      }
      else if (result.status == ApiResponseStatus.Error) {
        response.send(result)
      }
      else {
        response.send()
      }
    }

    if (middlewares) {
      this.router[method](path, middlewares, dispatch)
      return
    }

    this.router[method](path, dispatch)
  }
}
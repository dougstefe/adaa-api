import { ApiResponse } from '../types/api-response'
import { RouteOptions } from '../types/route-options'
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
      res.status(result.code).send(result)
    }

    if (middlewares) {
      this.router[method](path, middlewares, dispatch)
      return
    }

    this.router[method](path, dispatch)
  }
}
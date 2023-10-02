import { BaseController } from '@main/base/base-controller'
import { HttpMethod } from '@main/types/http-method'

export interface RouteOptions {
  path: string,
  method: HttpMethod,
  middlewares?: any[],
  handler: BaseController<unknown>,
}
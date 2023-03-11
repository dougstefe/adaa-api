import { BaseRouter } from '../base/base-router'
import { Express } from 'express'
import { container } from '../di/container'
import * as Routers from '../../presentation/routes'

export default (app: Express): void => {
  const routes = Object.values(Routers)

  for (const route of routes) {
    const instance = container.resolve<BaseRouter>(route)
    instance
    app.use(instance.route)
  }
}

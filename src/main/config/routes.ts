import 'reflect-metadata'

import { BaseRouter } from '@main/base/base-router'
import { Express } from 'express'
import { container } from '@main/di/container'
import { tokens } from '@main/di/tokens'

export default (app: Express): void => {

  const tokenRouters = [
    tokens.LoginRouter
  ]

  for (const token of tokenRouters) {
    const instance = container.resolve(token) as BaseRouter
    app.use('/api', instance.route)
  }
}

import { container as baseContainer } from 'tsyringe'
import { tokens } from './tokens'
const container = baseContainer.createChildContainer()


import { LoginController } from '@presentation/controllers/login-controller'

container.registerSingleton(tokens.LoginController, LoginController)

export { container }
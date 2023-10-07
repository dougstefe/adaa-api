import { container as baseContainer } from 'tsyringe'
import { tokens } from '@main/di/tokens'
const container = baseContainer.createChildContainer()

// Middlewares

import { Authorization } from '@presentation/middlewares/authorize'

container.registerSingleton(tokens.Authorization, Authorization)

// Login

import { LoginRouter } from '@presentation/routes/login-router'
import { LoginController } from '@presentation/controllers/login-controller'
import { LoginUseCase } from '@domain/user/login/login-usecase'
import { LoginRepository } from '@infra/user/login/login-repository'

container.registerSingleton(tokens.LoginRouter, LoginRouter)
container.registerSingleton(tokens.LoginController, LoginController)
container.registerSingleton(tokens.LoginUseCase, LoginUseCase)
container.registerSingleton(tokens.LoginRepository, LoginRepository)


// Main

import { Settings } from '@main/config/settings'

container.registerSingleton(tokens.Settings, Settings)

// Shared

import { AuthToken } from '@shared/auth/auth-token'
import { CriptografyHasher } from '@shared/criptografy/criptografy-hasher'
import { MongoDbClient } from '@shared/db/MongoDbClient'

container.registerSingleton(tokens.AuthToken, AuthToken)
container.registerSingleton(tokens.CriptografyHasher, CriptografyHasher)
container.registerSingleton(tokens.MongoDbClient, MongoDbClient)

export { container }
import { container as baseContainer } from 'tsyringe'
import { tokens } from '@main/di/tokens'
const container = baseContainer.createChildContainer()

// Middlewares

import { Authorization } from '@presentation/middlewares/authorize'

container.registerSingleton(tokens.Authorization, Authorization)

// Login

import { LoginRouter } from '@presentation/routes/login-router'
import { LoginController } from '@presentation/controllers/login-controller'
import { LoginUseCase } from '@domain/user/use-cases/login/login-usecase'
import { LoginMongoRepository } from '@domain/user/infra/login-mongo-repository'
import { UserMapper } from '@domain/user/infra/user-mapper'

container.registerSingleton(tokens.LoginRouter, LoginRouter)
container.registerSingleton(tokens.LoginController, LoginController)
container.registerSingleton(tokens.LoginUseCase, LoginUseCase)
container.registerSingleton(tokens.LoginRepository, LoginMongoRepository)
container.registerSingleton(tokens.UserMapper, UserMapper)

// Donation

import { DonationRouter } from '@presentation/routes/donation-router'
import { DonationController } from '@presentation/controllers/donation-controller'
import { DonationUseCase } from '@domain/donation/use-cases/add/donation-usecase'
import { DonationMongoRepository } from '@domain/donation/infra/donation-mongo-repository'

container.registerSingleton(tokens.DonationRouter, DonationRouter)
container.registerSingleton(tokens.DonationController, DonationController)
container.registerSingleton(tokens.DonationUseCase, DonationUseCase)
container.registerSingleton(tokens.DonationRepository, DonationMongoRepository)


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
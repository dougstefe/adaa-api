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
import { UserMongoRepository } from '@domain/user/infra/user-mongo-repository'
import { UserMapper } from '@domain/user/infra/user-mapper'

container.registerSingleton(tokens.LoginRouter, LoginRouter)
container.registerSingleton(tokens.LoginController, LoginController)
container.registerSingleton(tokens.LoginUseCase, LoginUseCase)
container.registerSingleton(tokens.LoginRepository, UserMongoRepository)
container.registerSingleton(tokens.UserMapper, UserMapper)

// Pet
import { PetMongoRepository } from '@domain/pet/infra/pet-mongo-repository'
container.registerSingleton(tokens.PetRepository, PetMongoRepository)

import { AddPetRouter } from '@presentation/routes/add-pet-router'
import { AddPetController } from '@presentation/controllers/add-pet-controller'
import { AddPetUseCase } from '@domain/pet/use-cases/add/add-pet-usecase'

container.registerSingleton(tokens.AddPetRouter, AddPetRouter)
container.registerSingleton(tokens.AddPetController, AddPetController)
container.registerSingleton(tokens.AddPetUseCase, AddPetUseCase)


import { ListPetRouter } from '@presentation/routes/list-pet-router'
import { ListPetController } from '@presentation/controllers/list-pet-controller'
import { ListPetUseCase } from '@domain/pet/use-cases/list/list-pet-usecase'

container.registerSingleton(tokens.ListPetRouter, ListPetRouter)
container.registerSingleton(tokens.ListPetController, ListPetController)
container.registerSingleton(tokens.ListPetUseCase, ListPetUseCase)


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
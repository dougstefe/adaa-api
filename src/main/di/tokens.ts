export const tokens = {
  // Login
  LoginRouter: Symbol('LoginRouter'),
  LoginController: Symbol('LoginController'),
  LoginUseCase: Symbol('LoginUseCase'),
  LoginRepository: Symbol('LoginRepository'),
  UserMapper: Symbol('UserMapper'),

  // Add Pet
  AddPetRouter: Symbol('AddPetRouter'),
  AddPetController: Symbol('AddPetController'),
  AddPetUseCase: Symbol('AddPetUseCase'),
  PetRepository: Symbol('PetRepository'),

  // Main
  Settings: Symbol('Settings'),
  Authorization: Symbol('Authorization'),

  // Shared
  AuthToken: Symbol('AuthToken'),
  CriptografyHasher: Symbol('CriptografyHasher'),
  MongoDbClient: Symbol('MongoDbClient')
}
export const tokens = {
  // Login
  LoginRouter: Symbol('LoginRouter'),
  LoginController: Symbol('LoginController'),
  LoginUseCase: Symbol('LoginUseCase'),
  LoginRepository: Symbol('LoginRepository'),
  UserMapper: Symbol('UserMapper'),

  // Pet
  PetRepository: Symbol('PetRepository'),

  AddPetRouter: Symbol('AddPetRouter'),
  AddPetController: Symbol('AddPetController'),
  AddPetUseCase: Symbol('AddPetUseCase'),

  ListPetRouter: Symbol('ListPetRouter'),
  ListPetController: Symbol('ListPetController'),
  ListPetUseCase: Symbol('ListPetUseCase'),

  // Main
  Settings: Symbol('Settings'),
  Authorization: Symbol('Authorization'),

  // Shared
  AuthToken: Symbol('AuthToken'),
  CriptografyHasher: Symbol('CriptografyHasher'),
  MongoDbClient: Symbol('MongoDbClient')
}
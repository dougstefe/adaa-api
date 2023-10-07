export const tokens = {
  // Login
  LoginRouter: Symbol('LoginRouter'),
  LoginController: Symbol('LoginController'),
  LoginUseCase: Symbol('LoginUseCase'),
  LoginRepository: Symbol('LoginRepository'),

  // Main
  Settings: Symbol('Settings'),
  Authorization: Symbol('Authorization'),

  // Shared
  AuthToken: Symbol('AuthToken'),
  CriptografyHasher: Symbol('CriptografyHasher'),
  MongoDbClient: Symbol('MongoDbClient')
}
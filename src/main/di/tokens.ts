export const tokens = {
  // Login
  LoginRouter: Symbol('LoginRouter'),
  LoginController: Symbol('LoginController'),
  LoginUseCase: Symbol('LoginUseCase'),
  LoginRepository: Symbol('LoginRepository'),

  // Donation
  DonationRouter: Symbol('DonationRouter'),
  DonationController: Symbol('DonationController'),
  DonationUseCase: Symbol('DonationUseCase'),

  // Main
  Settings: Symbol('Settings'),
  Authorization: Symbol('Authorization'),

  // Shared
  AuthToken: Symbol('AuthToken'),
  CriptografyHasher: Symbol('CriptografyHasher'),
  MongoDbClient: Symbol('MongoDbClient')
}
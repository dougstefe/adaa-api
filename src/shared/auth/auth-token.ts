import { User } from '@domain/user/login/models/user'
import { GenerateToken } from './interfaces/generate-token'
import { ValidateToken } from './interfaces/validate-token'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'
import { Settings } from '@main/config/settings'

@injectable()
export class AuthToken implements GenerateToken, ValidateToken {
  private readonly privateKey: string

  constructor(
    @inject(tokens.Settings)
    settings: Settings
  ) {

    const { secret } = settings.get()
    this.privateKey = secret
  }

  genetareToken(user: User): string {
    const {
      email,
      name,
      birthdate
    } = user
    const token: string = sign(
      {
        email,
        name,
        birthdate
      },
      this.privateKey
    )
    return token
  }

  validateToken(accessToken: string): User {
    const user: User = verify(accessToken, this.privateKey)
    return user
  }

}
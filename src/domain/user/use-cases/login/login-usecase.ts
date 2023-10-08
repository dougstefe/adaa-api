import { BaseUseCase } from '@main/base/base-use-case'
import { LoginRequest } from '@domain/user/use-cases/login/login-request'
import { LoginResponse } from '@domain/user/use-cases/login/login-response'
import { GetUserByEmailRepository } from '@domain/user/use-cases/login/get-user-repository'
import { GenerateToken } from '@shared/auth/interfaces/generate-token'
import { CompareHash } from '@shared/criptografy/interfaces/compare-hash'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'

@injectable()
export class LoginUseCase extends BaseUseCase<LoginRequest, LoginResponse | undefined> {
  constructor(
    @inject(tokens.AuthToken)
    private readonly token: GenerateToken,
    @inject(tokens.CriptografyHasher)
    private readonly hasherCompare: CompareHash,
    @inject(tokens.LoginRepository)
    private readonly getUserByEmailRepository: GetUserByEmailRepository
  ) {
    super()
  }
  async execute(request: LoginRequest): Promise<LoginResponse | undefined> {
    var user = await this.getUserByEmailRepository.getUserByEmail(request.email)
    if (!user)
      return

    const isPasswordOk = await this.hasherCompare.compare(request.password, user.password)

    if (!isPasswordOk)
      return

    const { name } = user
    return {
      name,
      accessToken: this.token.generateToken(user)
    }
  }
}
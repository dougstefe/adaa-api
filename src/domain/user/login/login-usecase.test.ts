import { GetUserByEmailRepository } from '@infra/user/login/interfaces/get-user-repository'
import { LoginUseCase } from './login-usecase'
import { User } from './models/user'
import { GenerateToken } from '@shared/auth/interfaces/generate-token'
import { CompareHash } from '@shared/criptografy/interfaces/compare-hash'
import { LoginRequest } from './models/login-request'

const makeFakeLoginRequest = (): LoginRequest => ({
  email: 'any@email.com',
  password: 'anypassword'
})

const makeFakeUser = (): User => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  birthdate: new Date(1983, 6, 10),
  password: 'hashed_password'
})

const makeGenerateToken = (): GenerateToken => {
  class GenerateTokenStub implements GenerateToken {
    genetareToken(_user: User): string {
      return 'any_token'
    }
  }
  return new GenerateTokenStub()
}

const makeCompareHash = (): CompareHash => {
  class CompareHashStub implements CompareHash {
    compare(_value: string, _hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new CompareHashStub()
}

const makeGetUserByEmailRepository = (): GetUserByEmailRepository => {
  class GetUserByEmailRepositoryStub implements GetUserByEmailRepository {
    getUserByEmail(_email: string): User {
      return makeFakeUser()
    }
  }
  return new GetUserByEmailRepositoryStub()
}

export interface SutTypes {
  generateTokenStub: GenerateToken
  compareHashStub: CompareHash
  getUserByEmailRepositoryStub: GetUserByEmailRepository
  sut: LoginUseCase
}

const makeSut = (): SutTypes => {
  const getUserByEmailRepositoryStub = makeGetUserByEmailRepository()
  const generateTokenStub = makeGenerateToken()
  const compareHashStub = makeCompareHash()
  const sut = new LoginUseCase(
    generateTokenStub,
    compareHashStub,
    getUserByEmailRepositoryStub
  )
  return {
    getUserByEmailRepositoryStub,
    generateTokenStub,
    compareHashStub,
    sut
  }
}

describe('Login UseCase', () => {
  test('Should calls GetUserByEmailRepository', async () => {
    const { sut, getUserByEmailRepositoryStub } = makeSut()
    const fakeLoginRequest = makeFakeLoginRequest()
    const getUserByEmailSpy = jest.spyOn(getUserByEmailRepositoryStub, 'getUserByEmail')

    await sut.execute(fakeLoginRequest)

    expect(getUserByEmailSpy).toHaveBeenCalledWith(fakeLoginRequest.email)
  })

  test('Should calls CompareHash', async () => {
    const { sut, compareHashStub } = makeSut()
    const fakeLoginRequest = makeFakeLoginRequest()
    const userFake = makeFakeUser()
    const compareSpy = jest.spyOn(compareHashStub, 'compare')

    await sut.execute(fakeLoginRequest)

    expect(compareSpy).toHaveBeenCalledWith(fakeLoginRequest.password, userFake.password)
  })

  test('Should not calls CompareHash', async () => {
    const { sut, getUserByEmailRepositoryStub, compareHashStub } = makeSut()
    const fakeLoginRequest = makeFakeLoginRequest()
    jest.spyOn(getUserByEmailRepositoryStub, 'getUserByEmail').mockReturnValueOnce(null as User)
    const compareSpy = jest.spyOn(compareHashStub, 'compare')

    await sut.execute(fakeLoginRequest)

    expect(compareSpy).toBeCalledTimes(0)
  })

  test('Should calls GenerateToken', async () => {
    const { sut, generateTokenStub } = makeSut()
    const fakeLoginRequest = makeFakeLoginRequest()
    const userFake = makeFakeUser()
    const genetareTokenSpy = jest.spyOn(generateTokenStub, 'genetareToken')

    await sut.execute(fakeLoginRequest)

    expect(genetareTokenSpy).toHaveBeenCalledWith(userFake)
  })

  test('Should not calls GenerateToken', async () => {
    const { sut, compareHashStub, generateTokenStub } = makeSut()
    const fakeLoginRequest = makeFakeLoginRequest()
    jest.spyOn(compareHashStub, 'compare').mockResolvedValueOnce(Promise.resolve(false))
    const genetareTokenSpy = jest.spyOn(generateTokenStub, 'genetareToken')

    await sut.execute(fakeLoginRequest)

    expect(genetareTokenSpy).toBeCalledTimes(0)
  })
})
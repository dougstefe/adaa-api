import { AddPetUseCase } from '@domain/pet/use-cases/add/add-pet-usecase'
import { PetType } from '@domain/shared/types/pet-type'
import { Pet } from '@domain/pet/entities/pet'
import { AddPetRequest } from './add-pet-request'
import { AddPetRepository } from './add-pet-repository'

const makeFakePetRequest = (): AddPetRequest => ({
  type: PetType.dog,
  color: 'any_color',
  datebirth: new Date(2020, 1, 1),
  name: 'any_name',
  observation: 'any_description',
  images: [
    'any_url'
  ],
  donatedBy: {
    id: 'any_id',
    email: 'any@email.com',
    name: 'Any Name'
  }
})

const makeAddPetRepository = (): AddPetRepository => {
  class AddPetRepositoryStub implements AddPetRepository {
    async add(_pet: Pet): Promise<string> {
      return Promise.resolve("any_id")
    }
  }
  return new AddPetRepositoryStub()
}

export interface SutTypes {
  addPetRepositoryStub: AddPetRepository
  sut: AddPetUseCase
}

const makeSut = (): SutTypes => {
  const addPetRepositoryStub = makeAddPetRepository()
  const sut = new AddPetUseCase(addPetRepositoryStub)
  return {
    addPetRepositoryStub,
    sut
  }
}

describe('Add Pet UseCase', () => {
  test('Should call AddPetRepository with correct value', async () => {
    const { sut, addPetRepositoryStub } = makeSut()
    const addSpyOn = jest.spyOn(addPetRepositoryStub, 'add')
    const fakePetRequest = makeFakePetRequest()

    await sut.execute(fakePetRequest)

    expect(addSpyOn).toHaveBeenCalledWith(fakePetRequest)
  })

  test('Should throw when AddPetRepository throws any exception', async () => {
    const { sut, addPetRepositoryStub } = makeSut()
    jest.spyOn(addPetRepositoryStub, 'add').mockRejectedValueOnce(new Error('any_exception'))
    const fakePetRequest = makeFakePetRequest()

    const promise = sut.execute(fakePetRequest)

    await expect(promise).rejects.toThrow('any_exception')
  })

  test('Should return PetResponse', async () => {
    const { sut } = makeSut()
    const fakePetRequest = makeFakePetRequest()

    const response = await sut.execute(fakePetRequest)

    expect(response).toEqual({
      id: 'any_id'
    })
  })
})
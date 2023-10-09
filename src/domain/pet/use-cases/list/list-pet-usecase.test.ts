import { PaginationRequest } from '@domain/shared/pagination/pagination-request'
import { ListPetRepository } from './list-pet-repository'
import { ListPetUseCase } from './list-pet-usecase'
import { Pet } from '@domain/pet/entities/pet'
import { PaginationResponse } from '@domain/shared/pagination/pagination-response'
import { PetType } from '@domain/shared/types/pet-type'
import { ListPetRequest } from './list-pet-request'

const makeFakePaginationRequest = (): PaginationRequest<ListPetRequest> => ({
  from: 0,
  size: 10,
  sort: {
    by: 'birthdate',
    direction: 'asc'
  },
  filter: {
    type: PetType.dog
  }
})

const makeFakePet = (): Pet => ({
  type: PetType.dog,
  color: 'any_color',
  datebirth: new Date('2020-01-01'),
  name: 'any_name',
  observation: 'any_observation',
  donatedBy: {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email'
  },
  images: [
    'any_url'
  ]
})

const makeFakePaginationResponse = (): PaginationResponse<Pet> => {
  const fakePets = Array(10).fill(makeFakePet())
  const total = 130
  return {
    total,
    data: fakePets
  }
}

const makeListPetRepository = (): ListPetRepository => {
  class ListPetRepositoryStub implements ListPetRepository {
    async list(_params: PaginationRequest<Pet>): Promise<PaginationResponse<Pet>> {
      return Promise.resolve(makeFakePaginationResponse())
    }
  }
  return new ListPetRepositoryStub()
}

export interface SutTypes {
  listRepositoryStub: ListPetRepository
  sut: ListPetUseCase
}

const makeSut = (): SutTypes => {
  const listRepositoryStub = makeListPetRepository()
  const sut = new ListPetUseCase(listRepositoryStub)
  return {
    listRepositoryStub,
    sut
  }
}

describe('List Pet UseCase', () => {
  test('Should call ListRepository', async () => {
    const { sut, listRepositoryStub } = makeSut()
    const listSpyOn = jest.spyOn(listRepositoryStub, 'list')
    const fakeRequest = makeFakePaginationRequest()

    await sut.execute(fakeRequest)

    expect(listSpyOn).toHaveBeenCalledWith(fakeRequest)
  })
})
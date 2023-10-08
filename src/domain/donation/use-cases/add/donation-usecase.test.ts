import { DonationUseCase } from '@domain/donation/use-cases/add/donation-usecase'
import { AnimalType } from '@domain/shared/models/animal-type'
import { Donation } from '@domain/donation/entities/donation'
import { DonationRequest } from './donation-request'
import { AddDonationRepository } from './add-donation-repository'

const makeFakeDonationRequest = (): DonationRequest => ({
  animalType: AnimalType.dog,
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

const makeAddDonationRepository = (): AddDonationRepository => {
  class AddDonationRepositoryStub implements AddDonationRepository {
    async add(donation: Donation): Promise<string> {
      return Promise.resolve("any_id")
    }
  }
  return new AddDonationRepositoryStub()
}

export interface SutTypes {
  addDonationRepositoryStub: AddDonationRepository
  sut: DonationUseCase
}

const makeSut = (): SutTypes => {
  const addDonationRepositoryStub = makeAddDonationRepository()
  const sut = new DonationUseCase(addDonationRepositoryStub)
  return {
    addDonationRepositoryStub,
    sut
  }
}

describe('Donation UseCase', () => {
  test('Should call AddDonationRepository with correct value', async () => {
    const { sut, addDonationRepositoryStub } = makeSut()
    const addSpyOn = jest.spyOn(addDonationRepositoryStub, 'add')
    const fakeDonationRequest = makeFakeDonationRequest()

    await sut.execute(fakeDonationRequest)

    expect(addSpyOn).toHaveBeenCalledWith(fakeDonationRequest)
  })

  test('Should throw when AddDonationRepository throws any exception', async () => {
    const { sut, addDonationRepositoryStub } = makeSut()
    jest.spyOn(addDonationRepositoryStub, 'add').mockRejectedValueOnce(new Error('any_exception'))
    const fakeDonationRequest = makeFakeDonationRequest()

    const promise = sut.execute(fakeDonationRequest)

    await expect(promise).rejects.toThrow('any_exception')
  })

  test('Should return DonationResponse', async () => {
    const { sut } = makeSut()
    const fakeDonationRequest = makeFakeDonationRequest()

    const response = await sut.execute(fakeDonationRequest)

    expect(response).toEqual({
      id: 'any_id'
    })
  })
})
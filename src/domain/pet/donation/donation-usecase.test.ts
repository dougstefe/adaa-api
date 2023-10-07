import { DonationUseCase } from '@domain/pet/donation/donation-usecase'
import { DonationRequest } from './models/donation-request'
import { AnimalType } from '@domain/shared/models/animal-type'
import { AddDonationRepository } from './infra/interfaces/add-donation-repository'
import { Donation } from './models/donation'

const makeFakeDonationRequest = (): DonationRequest => ({
  animalType: AnimalType.dog,
  color: 'any_color',
  datebirth: new Date(2020, 1, 1),
  name: 'any_name',
  observation: 'any_description'
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
})
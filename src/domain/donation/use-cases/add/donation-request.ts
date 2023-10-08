import { AnimalType } from '@domain/shared/models/animal-type'

export interface DonationRequest {
  animalType: AnimalType,
  color: string,
  datebirth: Date,
  name: string,
  observation: string,
  donatedBy: {
    id: string,
    email: string,
    name: string
  }
  images: string[]
}
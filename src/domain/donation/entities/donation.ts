import { AnimalType } from '@domain/shared/models/animal-type'

export interface Donation {
  animalType: AnimalType,
  color: string,
  datebirth: Date,
  name: string,
  observation: string,
  donatedBy: {
    id: string,
    name: string,
    email: string
  },
  images: string[]
}
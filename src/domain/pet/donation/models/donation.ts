import { AnimalType } from '@domain/shared/models/animal-type'

export interface Donation {
  animalType: AnimalType,
  color: string,
  datebirth: Date,
  name: string,
  observation: string
}
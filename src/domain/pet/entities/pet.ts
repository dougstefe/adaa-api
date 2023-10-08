import { PetType } from '@domain/shared/models/pet-type'

export interface Pet {
  type: PetType,
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
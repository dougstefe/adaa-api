import { PetType } from '@domain/shared/types/pet-type'

export interface Pet {
  id?: string,
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
import { PetType } from '@domain/shared/types/pet-type'

export interface AddPetRequest {
  type: PetType,
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
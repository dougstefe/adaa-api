import { PetType } from '@domain/shared/types/pet-type'

export interface ListPetResponse {
  type: PetType,
  color: string,
  datebirth: Date,
  name: string,
  observation: string,
  images: string[]
}
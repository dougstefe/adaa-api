import { PetType } from '@domain/shared/models/pet-type'

export interface Request {
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
import { Pet } from '@domain/pet/entities/pet'

export interface AddPetRepository {
  add(pet: Pet): Promise<string>
}
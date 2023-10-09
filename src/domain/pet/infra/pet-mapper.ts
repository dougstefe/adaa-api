import { WithId } from 'mongodb'
import { injectable } from 'tsyringe'
import { Pet } from '../entities/pet'

@injectable()
export class PetMapper {
  map(record: WithId<Pet>): Pet {
    const { _id: id, ...user } = record

    return {
      ...user,
      id: String(id),
    }
  }
}
import { MongoDbClient } from '@shared/db/MongoDbClient'
import { Filter, FindOneAndUpdateOptions, InsertOneOptions, ObjectId, OptionalId, OptionalUnlessRequiredId, WithId } from 'mongodb'

export abstract class BaseMongoRepository<Entity> {
  protected abstract collectionName: string
  protected client: MongoDbClient
  private textDecoder = new TextDecoder();

  protected async getCollection() {
    return this.getCollectionQuery(this.collectionName)
  }

  protected async getCollectionQuery(collectionName: string) {
    const db = await this.client.getInstance()
    return db.collection<Entity>(collectionName)
  }

  protected async findById(id: string): Promise<WithId<Entity> | null> {
    const filter = {
      _id: new ObjectId(id),
    } as Filter<Entity>

    const collection = await this.getCollection()
    return await collection.findOne<WithId<Entity>>(filter)
  }

  protected async findOne(filters: Filter<any>): Promise<Entity | null> {
    const collection = await this.getCollection()
    const document = await collection.findOne<WithId<Entity>>(filters)
    delete document._id
    return document as Entity
  }

  protected async insert(entity: Entity): Promise<string> {
    const collection = await this.getCollection()
    const creationDate = new Date()

    var objectId = new ObjectId()

    const response = await collection.insertOne({
      ...entity,
      createdAt: creationDate,
      updatedAt: creationDate,
      _id: objectId,
      id: String(objectId)
    } as OptionalUnlessRequiredId<Entity>)

    if (!response.acknowledged) {
      throw new Error('error_creating_record')
    }

    return String(response.insertedId)
  }

  protected async find(filters: Filter<any>, from: number, size: number, sort: string, sortDirection: string): Promise<Entity[]> {
    const collection = await this.getCollection()
    const documents = collection
      .find<WithId<Entity>>(filters)
      .sort(sort, sortDirection === 'asc' ? 1 : -1)
      .skip(from)
      .limit(size)
    const result = await documents.toArray()
    return result.map(x => {
      delete x._id
      return x as Entity
    })
  }

  protected async count(filters: Filter<any>): Promise<number> {
    const collection = await this.getCollection()
    return await collection.countDocuments(filters)
  }

  protected async update(id: string, entity: Partial<Entity>): Promise<WithId<Entity>> {
    const collection = await this.getCollection()
    const filter = {
      _id: new ObjectId(id),
    } as Filter<Entity>

    const update = {
      $set: {
        ...entity,
        updatedAt: new Date(),
      }
    }

    const options: FindOneAndUpdateOptions = {
      returnDocument: 'after',
    }

    return collection.findOneAndUpdate(filter, update, options) as unknown as WithId<Entity>
  }
}
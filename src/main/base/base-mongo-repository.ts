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

  protected async find(filters: Filter<any>): Promise<WithId<Entity> | null> {
    const collection = await this.getCollection()
    const document = await collection.findOne<WithId<Entity>>(filters)
    console.log(document)
    return document
  }

  protected async insert(entity: Entity): Promise<string> {
    const collection = await this.getCollection()
    const creationDate = new Date()

    const response = await collection.insertOne({
      ...entity,
      createdAt: creationDate,
      updatedAt: creationDate,
    } as OptionalUnlessRequiredId<Entity>)

    if (!response.acknowledged) {
      throw new Error('error_creating_record')
    }

    return this.textDecoder.decode(response.insertedId.id)
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
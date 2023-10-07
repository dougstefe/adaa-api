import { Settings } from '@main/config/settings'
import { Db, MongoClient } from 'mongodb'
import { inject, injectable } from 'tsyringe'
import { EventEmitter } from 'node:events'
import { tokens } from '@main/di/tokens'

@injectable()
export class MongoDbClient extends EventEmitter {
  private readonly host: string
  private readonly user: string
  private readonly password: string
  private readonly dbName: string
  private client: MongoClient
  private db: Db

  constructor(
    @inject(tokens.Settings)
    settings: Settings
  ) {
    super()
    const { db: { host, user, password, dbName } } = settings.get()
    this.host = host
    this.user = user
    this.password = password
    this.dbName = dbName
  }

  async connect() {
    const uri = `mongodb+srv://${this.user}:${this.password}@${this.host}?retryWrites=true&w=majority`
    this.client = new MongoClient(uri)
    await this.client.connect()

    this.db = this.client.db(this.dbName)
  }

  async getInstance(): Promise<Db> {
    if (!this.db) {
      await this.connect()
    }
    return this.db
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
    return
  }
}
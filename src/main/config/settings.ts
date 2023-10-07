import { injectable } from 'tsyringe'
import dotenv from 'dotenv'

@injectable()
export class Settings {
  private readonly config: Configuration
  constructor() {
    dotenv.config()
    this.config = {
      port: Number(process.env.PORT) || 5050,
      secret: process.env.TOKEN_SECRET,
      salt: Number(process.env.HASH_SALT),
      db: {
        host: process.env.MONGODB_HOST,
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
        dbName: process.env.MONGODB_DBNAME
      }
    }
  }

  public get() {
    return this.config
  }
}

type Configuration = {
  port: number
  secret: string
  salt: number
  db: {
    host: string
    user: string
    password: string
    dbName: string
  }
}
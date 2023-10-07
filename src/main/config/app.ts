import express from 'express'
import setupMiddlewares from '@main/config/middlewares'
import setupRoutes from '@main/config/routes'
import { MongoDbClient } from '@shared/db/MongoDbClient'

const app = express()

setupMiddlewares(app)
setupRoutes(app)

const startDb = (db: MongoDbClient) => {
  db.connect().catch((err) => {
    console.log('error connecting to db...', err)
    console.log('exiting...')
    process.exit(1)
  })
  db.on('disconnected', () => {
    console.log('db disconnected...')
    process.kill(process.pid, 'SIGTERM')
  })
}

export { app, startDb }
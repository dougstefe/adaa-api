import 'reflect-metadata'

import { app, startDb } from '@main/config/app'
import { Settings } from '@main/config/settings'
import { tokens } from '@main/di/tokens'
import { MongoDbClient } from '@shared/db/MongoDbClient'
import { container } from '@main/di/container'

const settings = container.resolve(tokens.Settings) as Settings

const { port } = settings.get()

startDb(container.resolve(tokens.MongoDbClient) as MongoDbClient)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

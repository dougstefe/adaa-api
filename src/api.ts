import { app } from '@main/config/app'
import { Settings } from '@main/config/settings'

const settings = new Settings()

const { port } = settings.get()

app.listen(port, () => console.log(`Server running at http://localhost:5050`))

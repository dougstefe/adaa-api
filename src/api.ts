import 'reflect-metadata'

import('./main/config/app').then((result) => {
  const app = result.default
  app.listen(5050, () => console.log(`Server running at http://localhost:5050`))
})

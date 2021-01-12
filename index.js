const app = require('./src/app')

const APP_PORT = 3500

app.listen(APP_PORT, () => console.log(`Book Library App is listening on port ${APP_PORT}`))
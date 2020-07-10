const express = require('express')
const app = express()

// Default is 8080
const port = process.env.port || 8080
const appEnv = process.env.APP_ENV || '"APP_ENV" NOT DEFINED';
const appSecret = process.env.APP_SECRET || '"APP_SECRET" NOT DEFINED';

app.get('/', (req, res) => res.send('Hello World!. Go to /env or /secret'))
app.get('/env', (req, res) => res.send(appEnv))
app.get('/secret', (req, res) => res.send(appSecret))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
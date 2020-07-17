const express = require('express')
const app = express()

// Three endpoints are exposed: /, /env and /secret.
// The environment variable APP_ENV is returned on /env and and APP_SECRET on /secret
app.get('/', (req, res) => res.send('Hello World!. Go to /env or /secret'))
app.get('/env', (req, res) => res.send("APP_ENV=" + process.env.APP_ENV))
app.get('/secret', (req, res) => res.send("APP_SECRET=" + process.env.APP_SECRET))

const port = 8080
app.listen(port, () => console.log(`App running on port ${port}!`))
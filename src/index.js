const path = require('path')
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 2020
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

server.listen(port, () => {
    console.log(`The server is up and runing on port ${port}!`)
})
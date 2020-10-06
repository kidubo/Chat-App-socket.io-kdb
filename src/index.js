const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { clear } = require('console')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 2020
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

// Server (emit) -> Client  (receive)- countUpdated
// Client (emit) -> Server (receive) - increment



io.on('connection', (socket) => {
    // console.log(`New WebSocket connection`)

    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++

    //     // socket.emi emit to a particular client
    //     // but using io.emit emit to everyone in the connection

    //     io.emit('countUpdated', count)

    // })

    socket.emit("message", "welcome!")
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

})

server.listen(port, () => {
    console.log(`The server is up and runing on port ${port}!`)
})
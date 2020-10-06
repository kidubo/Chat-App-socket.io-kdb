const socket = io()

// To receive the message from the server we use the method by calling 
//socket.on("name of the event and must match with that on in the server", ()=>{})

// socket.on('countUpdated', (count) => {
//     console.log(`The count  has been updated!!` + count)
// })

// // allow the client to update the count and send it to the server  emit event to the specific connection
// // so the server emit it to the other connected client emit event to every single connection

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
// //     socket.emit('increment')
// })

socket.on("message", (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    // const message = document.querySelector('input').value

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message)
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert(`Geo lacation is not supported by your browser.`)
    }

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

        })
    })
})
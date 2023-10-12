const express = require('express')
const app = express()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

server = app.listen(3000)

const io = require("socket.io")(server)

io.on('connection', (socket) => {
	console.log("Під'єднався новий користувач")

	socket.username = "Анонім"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

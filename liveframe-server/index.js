const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>howdy doody</h1>')
})

app.get('/sun-times', (req, res) => {
  res.send(require('./sun_times.json'))
})

io.on('connection', (socket) => {
  const token = socket.handshake.query.token
  console.log('user connected with token ' + token)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on 3000')
})


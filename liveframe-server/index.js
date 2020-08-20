// load .env
require('dotenv').config()

const fs = require('fs')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const jimp = require('jimp')
const Busboy = require('busboy')

const authenticator = require('./authenticator')

app.use(cors())

app.get('/', (req, res) => {
  res.send('OK').status(200)
})

app.get('/sun-times', (req, res) => {
  fs.readFile('sun_times.json', (err, data) => {
    if (err) console.error(err)
    else res.json(JSON.parse(data))
  })
})

app.get('/weather', (req, res) => {
  fs.readFile('weather.json', (err, data) => {
    if (err) console.error(err)
    else res.json(JSON.parse(data))
  })
})

app.post('/image', authenticator, (req, res, next) => {
  const bb = new Busboy({ headers: req.headers })
  const saveTo = process.env.NODE_ENV === 'production'
    ? '/var/images/photo_orig.jpg'
    : './images/image_orig.jpg'

  bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
    file.pipe(fs.createWriteStream(saveTo))
  })

  bb.on('finish', () => {
    res.writeHead(200, { Connection: 'close' })
    res.end()
    resizeImage(saveTo)
  })
  
  req.pipe(bb)
})

function resizeImage(filename) {
  const saveTo = process.env.NODE_ENV === 'production'
    ? '/var/images/photo.jpg'
    : './images/image.jpg'

  jimp.read(filename, (_, orig) => {
    orig.cover(780, 430, (_, mod) => {
      mod.write(saveTo)
    })
  })
}

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


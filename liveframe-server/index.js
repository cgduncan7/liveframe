// load .env
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const jimp = require('jimp')
const Busboy = require('busboy')
const qrcode = require('qrcode')

const authenticator = require('./authenticator')

const imagePath = process.env.NODE_ENV === 'production'
    ? '/var/www/images'
    : path.join(__dirname, '/images')

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

function getOldestImageFilename(cb) {
  let oldestBirth = 0
  let oldestFilename
  fs.readdir(`${imagePath}/orig/`, (err, files) => {
    if (err !== null) {
      res.sendStatus(500)
      next()
      return
    }

    files.forEach((file) => {
      const stats = fs.statSync(`${imagePath}/orig/${file}`)
      if (stats.birthtimeMs > oldestBirth) {
        oldestFilename = file
      }
    })
    
    cb(oldestFilename)
  })
}

app.get('/image/:type', (req, res, next) => {
  const { type } = req.params
  switch (type) {
    case 'window': {
      res.sendFile(`${imagePath}/window.jpg`)
    }
    case 'photo': {
      const { name } = req.query
      res.sendFile(`${imagePath}/orig/${name}`)
    }
    default: {
      res.sendStatus(400)
      next()
    }
  }
})

app.get('/image/:type/qr', async (req, res, next) => {
  switch (type) {
    case 'window': {
      const code = qrcode.create(`${process.env.BASE_URL}/image/window`)
      const segments = code.segments
      const dataUrl = await qrcode.toDataURL(segments)
      res.json({ qrcode: dataUrl })
      next()
    }
    case 'photo': {
      await getOldestImageFilename(async (filename) => {
        const code = qrcode.create(`${process.env.BASE_URL}/image/photo?name=${filename}`)
        const segments = code.segments
        const dataUrl = await qrcode.toDataURL(segments)
        res.json({ qrcode: dataUrl })
        next()
      })
    }
    default: {
      res.sendStatus(400)
      next()
    }
  }
})

app.post('/image/photo', authenticator, (req, res, next) => {
  const bb = new Busboy({ headers: req.headers })
  let filename = `${new Date().toDateString()}.jpg`

  bb.on('file', (_fieldname, _file, _filename, _encoding, _mimetype) => {
    filename = _filename
    _file.pipe(fs.createWriteStream(`${imagePath}/orig/${filename}`))
  })

  bb.on('finish', () => {
    res.writeHead(200, { Connection: 'close' })
    res.end()
    resizeImage(`${imagePath}/orig/${filename}`)
  })
  
  req.pipe(bb)
})

function resizeImage(filename) {
  const saveTo = `${imagePath}/photo.jpg`

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


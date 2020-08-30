const authenticator = (req, res, next) => {
  const auth = req.header('authorization')

  if (auth === undefined) {
    res.sendStatus(401)
    return
  }

  const [authType, encodedToken] = auth.split(' ')

  if (authType.toLowerCase() !== 'basic') {
    console.error('invalid auth type')
    res.sendStatus(401)
    return
  }

  const decodedToken = Buffer.alloc(encodedToken.length * 3 / 4, encodedToken, 'base64').toString()

  const [user, pass] = decodedToken.split(':')

  if (user === process.env.USERNAME&& pass === process.env.PASSWORD) {
    next()
  } else {
    console.error('invalid user/pass', process.env.USERNAME, process.env.PASSWORD)
    res.sendStatus(401)
    return
  }
}

module.exports = authenticator
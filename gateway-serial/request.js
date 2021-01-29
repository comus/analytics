const coap = require('./lib/coap')

const request = async (url) => {
  return new Promise((resolve, reject) => {
    const req = coap.request(url)

    if (url.body) {
      req.write(url.body)
    }

    req.on('response', (res) => {
      // console.log(res.payload.toString())
      // console.log(res._packet)
      // console.log('res', res)
      resolve(res._packet)
    })

    req.end()
  })
}

module.exports = request

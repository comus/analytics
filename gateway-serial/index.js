const _ = require('lodash')
const parse = require('./lib/coap/lib/coap-packet').parse
const generate = require('./lib/coap/lib/coap-packet').generate
const request = require('./request')

var codes = {
  0.01: 'GET',
  0.02: 'POST',
  0.03: 'PUT',
  0.04: 'DELETE'
}

setTimeout(async () => {
  const reqBuf = Buffer.from('4401859a77c33147dd021875726c3d687474703a2f2f6c6f63616c686f73743a333030302f6170692f746f646f732f32', 'hex')
  const reqPacket = parse(reqBuf)
  console.log(reqPacket)

  const resPacket = await request({
    host: 'localhost',
    method: codes[reqPacket.code],
    confirmable: reqPacket.confirmable,
    pathname: '/',
    options: reqPacket.options
      ? _.mapValues(_.keyBy(reqPacket.options, 'name'), 'value')
      : {}
  })
  console.log('resPacket', resPacket)

  resPacket.messageId = reqPacket.messageId
  resPacket.token = reqPacket.token
  const resBuf = generate(resPacket)
  console.log(resBuf)
  console.log(parse(resBuf))
}, 1000)

const parse = require('url-parse')
const fetch = require('node-fetch')
const coap = require('coap')

const server = coap.createServer()

server.on('request', async (req, res) => {
  const params = {
    code: req.code,
    method: req.method,
    headers: req.headers,
    url: req.url,
    payload: req.payload.toString(),
    options: req.options.map(option => ({
      ...option,
      value: option.value.toString()
    })),
    query: parse(req.url, true).query
  }

  let result = ''

  if (params.method === 'GET') {
    const httpResponse = await fetch(params.query.url)
    const contentType = httpResponse.headers['content-type']
    if (contentType && contentType.includes('application/json')) {
      res.setOption('Content-Format', 'application/json')
    }
    result = await httpResponse.text()
  } else if (params.method === 'POST') {
    const isJson = params.headers['Content-Type'] === 'application/json'
    const httpResponse = await fetch(params.query.url, {
      method: 'post',
      body: params.payload,
      headers: {
        'Content-Type': isJson ? 'application/json' : 'text/plain'
      }
    })
    const contentType = httpResponse.headers['content-type']
    if (contentType && contentType.includes('application/json')) {
      res.setOption('Content-Format', 'application/json')
    }
    result = await httpResponse.text()
  } else if (params.method === 'PUT') {
    const isJson = params.headers['Content-Type'] === 'application/json'
    const httpResponse = await fetch(params.query.url, {
      method: 'put',
      body: params.payload,
      headers: {
        'Content-Type': isJson ? 'application/json' : 'text/plain'
      }
    })
    const contentType = httpResponse.headers['content-type']
    if (contentType && contentType.includes('application/json')) {
      res.setOption('Content-Format', 'application/json')
    }
    result = await httpResponse.text()
  } else if (params.method === 'DELETE') {
    const httpResponse = await fetch(params.query.url, {
      method: 'delete'
    })
    result = await httpResponse.text()
  }

  res.end(result)
})

server.listen(() => {
  console.log('The CoAP server is now running.')
})

setTimeout(async () => {
  const request = async (url) => {
    return new Promise((resolve, reject) => {
      const req = coap.request(url)

      if (url.body) {
        req.write(url.body)
      }

      req.on('response', (res) => {
        console.log(res.payload.toString())
        // console.log('res', res)
        resolve()
      })

      req.end()
    })
  }

  await request({
    host: 'localhost',
    method: 'GET',
    pathname: '/',
    query: 'url=http://localhost:3000/api/todos/1&aaa=1',
    options: {}
  })

  await request({
    host: 'localhost',
    method: 'POST',
    pathname: '/',
    query: 'url=http://localhost:3000/api/todos',
    options: {
      'Content-Format': 'application/json'
    },
    body: JSON.stringify({
      name: 'this is a test payload',
      isCompleted: false
    })
  })

  await request({
    host: 'localhost',
    method: 'PUT',
    pathname: '/',
    query: 'url=http://localhost:3000/api/todos/1',
    options: {
      'Content-Format': 'application/json'
    },
    body: JSON.stringify({
      name: 'this is a test payload'
    })
  })

  await request({
    host: 'localhost',
    method: 'DELETE',
    pathname: '/',
    query: 'url=http://localhost:3000/api/todos/1',
    options: {}
  })
}, 1000)

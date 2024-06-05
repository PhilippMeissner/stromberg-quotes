const fetch = require('node-fetch');

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  return await fn(req, res)
}

const handler = (req, res) => {
  let url = process.env.PREACT_APP_QUOTE_API_URL;

  if (req.body && req.body.url) {
    url = req.body.url
  }

  fetch(url)
  .then(result => result.json())
  .then(json => res.send(json))
  .catch(e => res.send(e))
}

module.exports = allowCors(handler)

'use strict'
const levelup = require('levelup')
const db = levelup('./assets')
const Assets = require('@drinky78/assets-service')

const assets = Assets(db)

module.exports.register = function (server, options, next) {

  function list (request, reply) {
    console.log(assets)
    assets.list(null, (response) => {
      reply(response)
    })
  }

  function insert (request, reply) {
    reply('insert')
  }

  function update (request, reply) {
    reply('update')
  }

  function status (request, reply) {
    reply('status')
  }

  server.route({ method: 'GET', path: '/list', handler: list })
  server.route({ method: 'GET', path: '/status/{name}', handler: status })
  server.route({ method: 'GET', path: '/insert/{name}/{state}', handler: insert })
  server.route({ method: 'GET', path: '/update/{name}/{state}', handler: update })

  next()
}

module.exports.register.attributes = {
  name: 'myplugin',
  version: '0.0.1'
}

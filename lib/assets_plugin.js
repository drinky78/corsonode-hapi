'use strict'
const Joi = require('joi')
const levelup = require('levelup')
const db = levelup('./assets')
const Assets = require('@drinky78/assets-service')

const assets = Assets(db)

module.exports.register = function (server, options, next) {

  const insertValidation = {
    validate: {
      params: {
        name: Joi.string(),
        state: Joi.any().valid(['wait', 'operational', 'error']),
      }
    }
  }

  function list (request, reply) {
    assets.list(null, (response) => {
      reply(response)
    })
  }

  function insert (request, reply) {
    assets.insert(request.params.name, request.params.state, (response) => {
      reply(response)
    })
  }

  function update (request, reply) {
    reply('update')
  }

  function status (request, reply) {
    reply('status')
  }

  server.route({ method: 'GET', path: '/list', handler: list })

  server.route({ method: 'GET', path: '/status/{name}', handler: status })

  server.route({ method: 'GET', path: '/insert/{name}/{state}', handler: insert, config: insertValidation })

  server.route({ method: 'GET', path: '/update/{name}/{state}', handler: update })

  next()
}

module.exports.register.attributes = {
  name: 'myplugin',
  version: '0.0.1'
}

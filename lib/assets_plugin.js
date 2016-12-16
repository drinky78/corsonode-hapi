'use strict'
const Joi = require('joi')
const levelup = require('levelup')
const db = levelup('./assets')
const Assets = require('@drinky78/assets-service')

const assets = Assets(db)

module.exports.register = function (server, options, next) {

  const insertUpdateValidation = {
    validate: {
      params: {
        username: Joi.string(),
        asset: Joi.string(),
        state: Joi.any().valid(['wait', 'operational', 'error']),
      }
    }
  }

  function list (request, reply) {
    assets.list(request.params.username, (err, response) => {
      reply(response)
    })
  }

  function insert (request, reply) {
    assets.insert(request.params.username, request.params.asset, request.params.state, (err, response) => {
      reply(response)
    })
  }

  function update (request, reply) {
    reply('update')
  }

  function status (request, reply) {
    reply('status')
  }

  server.route({ method: 'GET', path: '/{username}/assets', handler: list })

  server.route({ method: 'GET', path: '/{username}/assets/{asset}', handler: status })

  server.route({ method: 'POST', path: '/{username}/assets/{asset}/{state}', handler: insert, config: insertUpdateValidation })

  server.route({ method: 'PUT', path: '/{username}/assets/{asset}/{state}', handler: update, config: insertUpdateValidation })

  next()
}

module.exports.register.attributes = {
  name: 'myplugin',
  version: '0.0.1'
}

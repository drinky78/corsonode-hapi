'use strict'

const code = require('code')
const Lab = require('lab')
const rimraf = require('rimraf')
const lab = exports.lab = Lab.script({ output: process.stdout })
const build = require('../assets')



lab.experiment('Hello', () => {
  let server

  lab.beforeEach((done) => {
    build({ port: 8989 }, (err, s) => {
      server = s
      done(err)
    })
  })

  lab.test('Testing for not existing route', (done) => {
    const options = { method: 'GET', url: '/not_existing_route' }
    server.inject(options, function (response) {

      code.expect(response.statusCode).to.equal(404)
      done()
    })
  })

  lab.test('Testing for "list"', (done) => {
    const options = { method: 'GET', url: '/list' }
    server.inject(options, function (response) {
      const result = response.result

      code.expect(result).to.be.an.array().and.to.equal([])
      done()
    })
  })

  lab.test('Testing for "insert"', (done) => {

    const name = "ksufgyisuhd";
    const state = "operational";
    const options = { method: 'GET', url: '/insert/'+name+'/'+state }

    server.inject(options, function (response) {

      console.log(response.result)

      const result = response.result

      code.expect(result.length).to.be.at.least(0)
      code.expect(result).contain(name)
      done()
    })
  })

  lab.test('Testing for "insert" with empty name', (done) => {

    const name = '';
    const state = "operational";
    const options = { method: 'GET', url: '/insert/'+name+'/'+state }

    server.inject(options, function (response) {

      code.expect(response.statusCode).to.be.equal(404)
      done()
    })
  })

  lab.test('Testing for "insert" with wrong state name', (done) => {

    const name = '12345';
    const state = "wrongstate";
    const options = { method: 'GET', url: '/insert/'+name+'/'+state }

    server.inject(options, function (response) {

      code.expect(response.statusCode).to.be.equal(400)
      done()
    })
  })



})

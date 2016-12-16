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
    const options = { method: 'GET', url: '/username/assets' }
    server.inject(options, function (response) {

      const result = response.result
      code.expect(response.statusCode).to.be.equal(200)
      code.expect(result).to.be.an.array().and.to.equal([])
      done()
    })
  })

  lab.test('Testing for "insert"', (done) => {

    const username = "thisisme";
    const asset = "uberasset";
    const state = "operational";
    const options = { method: 'POST', url: `/${username}/assets/${asset}/${state}` }

    server.inject(options, function (response) {

      const result = response.result

      code.expect(response.statusCode).to.be.equal(200)
      code.expect(result.length).to.be.at.least(0)
      code.expect(result).contain(asset)
      done()
    })
  })

  lab.test('Testing for "insert" with empty asset name', (done) => {

    const username = "thisisme";
    const asset = "";
    const state = "operational";
    const options = { method: 'POST', url: `/${username}/assets/${asset}/${state}` }

    server.inject(options, function (response) {

      code.expect(response.statusCode).to.be.equal(404)
      done()
    })
  })

  lab.test('Testing for "insert" with wrong state name', (done) => {

    const username = "thisisme";
    const asset = "";
    const state = "wrongstate";
    const options = { method: 'POST', url: `/${username}/assets/${asset}/${state}` }

    server.inject(options, function (response) {

      code.expect(response.statusCode).to.be.equal(404)
      done()
    })
  })



})

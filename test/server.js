'use strict'

const code = require('code')
const Lab = require('lab')
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

  lab.test('Testing for "list"', (done) => {
    const options = { method: 'GET', url: '/list' }
    server.inject(options, function (response) {
      const result = response.result

      code.expect(result).to.equal([])
      done()
    })
  })
})

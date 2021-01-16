const { expect } = require('chai')
const request = require('supertest')
const app = require('../src/app')
const { Reader } = require('../src/models')
const dataFactory  = require('../test-helpers/data-factory')

describe('/readers', () => {
  //sync with db
  before(async () => {
    try {
      await Reader.sequelize.sync()
    } catch(err) {
      console.log(err)
    }
  })

  // clear database before each
  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} })
    } catch (err) {
      console.log(err)
    }  
  })

  describe('POST /readers', () => {

    it('creates a reader entry in the database and responds with the new record', (done) => {
      const reader = dataFactory.reader({})
      request(app)
      .post('/readers')
      .send(reader)
      .then(res => {
        expect(res.status).to.equal(201)
        Reader.findByPk(res.body.id, { raw: true })
        .then(dbReader => {
          expect(dbReader.name).to.equal(reader.name)
          expect(dbReader.email).to.equal(reader.email)
          expect(dbReader.password).to.equal(reader.password)
          done()
        })
      })  
    })
  })
 
})
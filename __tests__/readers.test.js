/* eslint-disable no-undef */
const { expect } = require('chai')
const { Reader } = require('../src/models')
const dataFactory  = require('../test-helpers/data-factory')
const { appRequest, postReaders, getReaders } = require('../test-helpers/request-helpers')

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
    const reader = dataFactory.reader({})
    it('creates a reader entry in the database and responds with the new record', (done) => {
      postReaders(reader)
      .then(res => {
        expect(res.status).to.equal(201)
        Reader.findByPk(res.body.id, { raw: true })
        .then(dbReader => {
          expect(dbReader.name).to.equal(reader.name)
          expect(dbReader.email).to.equal(reader.email)
          expect(dbReader.password).to.equal(reader.password)
          done()
        }).catch(error => done(error))  
      }).catch(error => done(error))  
    })

    describe('POST /readers, missing fields', () => {
      it('returns a 404 if name is missing', (done) => {
        postReaders({...reader, name: ''  })
        .then(res => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.equal('All fields are required')
          done()
        }).catch(error => done(error))  
      })
      it('returns a 404 if email is missing', (done) => {
        postReaders({...reader, email: ''  })
        .then(res => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.equal('All fields are required')
          done()
        }).catch(error => done(error))  
      })
      it('returns a 404 if password is missing', (done) => {
        postReaders({...reader, password: ''  })
        .then(res => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.equal('All fields are required')
          done()
        }).catch(error => done(error))  
      })
    })
  })

  describe('GET /readers', () => {
    let readers
    beforeEach(done => {
      Promise.all([
        Reader.create(dataFactory.reader({})),
        Reader.create(dataFactory.reader({})),
        Reader.create(dataFactory.reader({}))
        ])
        .then(records => { 
          readers = records 
          done()
       })
    })

    it('returns a list of readers', (done) => {
      getReaders()
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body.readers).to.have.lengthOf(3)
        done()
      }).catch(error => done(error)) 
    })
  })
})

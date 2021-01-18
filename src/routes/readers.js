const readersRouter = require('express').Router()

const { createReader, listReaders } = require('../controllers/readers')

readersRouter.post('/', createReader)

readersRouter.get('/', listReaders)

module.exports = readersRouter
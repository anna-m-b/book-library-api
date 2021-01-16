const readersRouter = require('express').Router()

const { createReader } = require('../controllers/readers')

readersRouter.post('/', createReader)

module.exports = readersRouter
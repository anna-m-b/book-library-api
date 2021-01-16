const Sequelize = require('sequelize')
const ReaderModel = require('./reader')

const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER, DB_PORT } = process.env

const setUpDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  })

  const Reader = ReaderModel(connection, Sequelize)

  connection.sync({ alter: true }) //This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
  return {
    Reader
  }
}

module.exports = setUpDatabase()

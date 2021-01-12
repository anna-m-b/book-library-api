const Sequelize = require('sequelize')

// Require sequelize at the top of this file
// Declare a function as setupDatabase. Declare a const and assign a new Sequelize() to it. Pass it the connection infomation from your .env
// Still inside the funciton, call sequelize.sync({alter: true})
// Have the function return an empty object for now.
// At the bottom of the file, module.exports = setupDatabase()
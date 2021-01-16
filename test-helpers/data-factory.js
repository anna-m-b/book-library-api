const faker = require('faker')

exports.reader = ({ name, email, password }) => ({
  name: name || faker.name.findName(),
  email: email || faker.internet.email(),
  password: password || faker.internet.password()
})
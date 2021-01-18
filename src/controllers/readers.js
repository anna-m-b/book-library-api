const { Reader } = require('../models')

exports.createReader = (req, res) => {
 const { name, email, password } = req.body
 if (!name || !email || !password) {
   res.status(400).send({error: 'All fields are required'})
 } else {
   Reader.create(req.body)
    .then(reader => res.status(201).json(reader))
 }
}

exports.listReaders = (req, res) => {
  Reader.findAll()
  .then(readers => {
    res.status(200).json({readers})
  })
   
}
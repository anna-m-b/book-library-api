/* eslint-disable no-unexpected-multiline */
const request = require('supertest')
const app = require('../src/app')

exports.appRequest = ({ method, path, data }) => {
  return new Promise((resolve, reject) => {
    request(app)
    [method](path)
    .send(data)
    .end((error, response) => {
      if(error) {
        reject(error)
      } else {
        resolve(response)
      }
      })
    })
 }

 exports.postReaders = (data) => { 
  return new Promise((resolve, reject) => {
    request(app)
      .post(`/readers`)
      .send(data)
      .end((error, response) => {
        if(error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })
}

exports.getReaders = () => {
  return new Promise((resolve, reject) => {
    request(app)
      .get(`/readers`)
      .end((error, response) => {
        if(error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })

}
# Test Helpers

In the previous backend project, Music Library API, there is repeated code throughout the tests where we make our requests, e.g:  
  
```
 request(app)
  .patch(`/artists/${artist.id}`)
  .send({ name: 'Tame Impaler' })
```

or

```
request(app)
  .post('/artists')
  .send({
        name: 'Tame Impala',
        genre: 'Rock',
    })
```  

In every test we need to call supertest on our app, set the method, path and perhaps send data. To make the code for this project more DRY, we can abstract out this process into one function we can call in each test. There are different levels of abstraction we can go to. I could write one request helper function to be used in all requests, independent of path and model:  

```
// test-helpers/request-helper.js

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
 ```

Here we declare a function that will receive an object with 3 properties: `method`, `path`, and `data`. We deconstruct those values immediately to use them in a new `Promise` which will invoke supertest (`request`) and return either an error if rejected or the response if resolved, which we can then run our assertions against.

In `__tests__/readers.test.js` we call it like this:  

```
it('creates a reader entry in the database and responds with the new record', (done) => {
  appRequest({
    method: 'post',
    path: '/readers',
    data: reader
  })
  .then(res => {
    // run assertions 
  })
})
```

While it doesn't really reduce the amount of code we need to write in this project, it perhaps has the advantage of simplifying the code base and reducing the number of potential errors.

Another option is to create helpers for specific models and methods:

```
exports.postReaders = (data) => {
  return new Promise((resolve, reject) => {
    request(app)
      .post('/readers')
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

```

In our test file:

```
it('creates a reader entry in the database and responds with the new record', (done) => {
      postReaders(reader)
      .then(res => {
        // run assertions
})
```  

I prefer how clean this looks, the disadvantage being the need to write more helper functions.
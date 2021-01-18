# Setting Up

Make a project folder locally, and from inside it initialise it as a git repo, and as an npm project:

```
$ git init

$ npm init
```

Add `node_modules/` to `.gitignore`.

Create a repo on GitHub and set it as the remote on your computer using GitHub's instructions.


## Install dependecies:

With [Express](https://expressjs.com) we can quickly and easily create a web server in Node.
```
$ npm install -S express
```  

[Sequelize](https://sequelize.org) allows us to interact with our database in JavaScript.
```
$ npm install -S sequelize
```  

To create our database we'll use npm package [MySQL2](https://www.npmjs.com/package/mysql2) 
```
$ npm install -S mysql2
```  

[Nodemon](https://www.npmjs.com/package/nodemon) is a useful development tool for Node.js applications that restarts our server whenever changes are made to the code, meaning we don't have to constantly type `npm start` as we build our app.  
```
$ npm install nodemon --save-dev  
```


 ```
$ npm install dotenv --save-dev
```
[dotenv](https://www.npmjs.com/package/dotenv) allows us to load our environment variables from their `.env` file into our app via `process.env`.


## Directory Structure

Here you can see the folders and initial files that we'll need:

```
book-library-api/  
  |-- README.md
  |-- index.js 
  |--.gitignore
  |--.env
  |--.env.test
  |____tests__/
  |__test-helpers/
  |__scripts/
  |__src/  
  |   |-- controllers/  
  |   |-- middleware/  
  |   |-- models/  
  |   |-- routes/  
  |   |-- app.js  
 
  ```


## Database set up

We're using MySQL for our relational database, which we run in a Docker container. To pull the MySQL image from Docker Hub and get it up and running run the following in your CLI:

```
$ docker run -d -p 3307:3306 --name book_library -e MYSQL_ROOT_PASSWORD=<YOUR-PASSWORD> mysql
```
Notice that the name `book_library` uses an underscore and not a hyphen. MySQL doesn't like hyphens in names. I tried it and it woudln't connect.



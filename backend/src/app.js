const faker = require('faker');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const { fstat } = require('fs');
const fs = require('fs');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/v1/', (req, res) => {
  res.json({
    message: 'Backend is currently Up'
  });
});

function generateTasks(){
  let tasks = []
  var rand = Math.floor(Math.random() * Math.floor(10));
  let task;
  
  switch(rand){
    case 0: //Make something
      task = "Make a "+ faker.commerce.product();
      break;
    case 1: //Meet someone
      task = "Meet someone named "+ faker.name.firstName();
      break;
    case 2: //Research something
      task = "Research "+ faker.commerce.productMaterial()+" "+ faker.commerce.product();
      break;
    case 3: //Visit site
      task = "Visit "+ faker.internet.domainName();
      break;
    case 4: //Look at images of city
      task = "Find pictures of "+ faker.address.city();
      break;
    case 5: //Google color of random thing
      task = "Google "+ faker.commerce.color() +" "+ faker.random.word();
      break;
    case 6: //Make money
      task = "Earn "+ faker.commerce.price()+"e";
      break;
    case 7: //Plan something for date
      task = "Plan an event for "+ faker.date.soon();
      break;
    case 8: //Look at cat image
      task = "Admire a randomized image: "+ faker.image.imageUrl();
      break;
    case 9: //Do computer task
      task = "Do a "+ faker.hacker.verb();
      break;
    default: //Do task - Just in case
      task = "Go "+ faker.hacker.ingverb();
      break;
  }
  tasks.push({
    "task": task
  })
  return { "data": tasks}
}

app.get('/api/v1/tasks/random', (req, res) => {
    let dataObj = generateTasks();
    res.json({dataObj});
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

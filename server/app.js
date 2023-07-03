const express = require('express');
var cors = require('cors')
const app = express();
var morgan = require('morgan');
const { nextTick } = require('process');
var faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const port = 3000;
const bodyParser = require('body-parser');
const webpush = require('web-push');
const { exists } = require('fs');

require('dotenv').config();

// console.log(process.env.CGM_API_KEY);

const routes = require('./routes');

app.use(cors({
  origin: '*'
}))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json());

app.use('/api', routes);


app.listen(port, () => {
  console.log(`🎵 plateful server is listening on port ${port}. `)  
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Item = require('./models/item');
require('dotenv').config();
const category = require('./models/category')
// const extendsLayout = require('./models/category')
console.log(process.env);

var indexRouter = require('./routes/index');

var app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = process.env.MONGO_DB;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
`mongoose.connect ("mongoDB", { useNewUrlParser: true, useUnifiedTopology: true })`;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use(Item());
// app.use(category());
// app.use(extendsLayout());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



module.exports = app;
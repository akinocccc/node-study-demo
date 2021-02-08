/*
 * @Description: 
 * @Author: AS
 * @Date: 2021-02-04 12:50:10
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 13:41:23
 * @FilePath: \AdminLte\Backend\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
//var cors = require('cors');

var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/position');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用cors工具，后端代理，解决跨域
//app.use(cors());

//设置cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use('/api/users', usersRouter);
app.use('/api/positions', positionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

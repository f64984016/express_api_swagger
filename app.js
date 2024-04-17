var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const port = 3100;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pagesRouter = require('./routes/pagesRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages', pagesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, ()=> {   //app.listen啟動並監聽 express server
    console.log('listening on port ' + port);
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const routes = require('./routes');
const { home } = require('./controllers');

const server = express();

server.set('name', 'W\'inn');
server.set('url', 'localhost');
server.set('port', 3000);
server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');

// middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev', {}));

server.get('/', home.index);

// Mount Routes.
server.use('/api', routes);

const start = () => {
  server.listen(server.get('port'), () => {
    console.log(`🌐   ${server.get('name')} listening at ${server.get('url')}:${server.get('port')}`);

    // logger
    routes.stack.map((item) => item.route && item.route.path
      ? console.log(`🚜   create route ${(Object.keys(item.route.methods)[0]).toUpperCase()} api${item.route.path} `)
      : '');
  });
}

module.exports = {
  start, 
  server
}
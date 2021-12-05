const app = require('./server.js').app

const route = require('./routes/route.js');
app.use('/', route);
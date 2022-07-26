const http = require('http');
const app = require('./app');
const dotenv = require("dotenv");
dotenv.config();
app.set('port', 3000);
const server = http.createServer(app);

server.listen(3000);
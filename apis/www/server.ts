import * as https from 'https';
import * as fs from 'fs';
import Application from "./app";
import WS from "./ws";

const PORT = 3000;
let debug = require('debug')('node-app:server');
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('server address : ',addr);
    debug('Listening on ' + bind);
}

let app:any = new Application();
let server:any;
server = https.createServer(httpsOptions, app.web);
const io = require('socket.io')(server);
app.ws = new WS(io,app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
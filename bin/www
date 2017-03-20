#!/usr/bin/env node

// 依赖
var app = require('../app'),
    debug = require('debug')('demo:server'),
    http = require('http');

// 从环境变量中获取端口号或使用 express 默认端口
var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// 创建 HTTP 服务器
var server = http.createServer(app.callback());

// 监听制定端口
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// 格式化端口号
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

// 事件监听器，监听错误事件
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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

// 事件监听器，监听 listening 事件
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

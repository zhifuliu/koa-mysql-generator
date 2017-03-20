var app = require('koa')(),
    koa = require('koa-router')(),
    logger = require('koa-logger'),
    json = require('koa-json'),
    views = require('koa-views'),
    onerror = require('koa-onerror');

var index = require('./routes/index'),
    users = require('./routes/users');

// 全局中间件
app.use(views('views', {
    root: __dirname + '/views',
    default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function*(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// 路由定义
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());

// 挂载根路由
app.use(koa.routes());

app.on('error', function(err, ctx) {
    logger.error('服务器错误，错误信息：\n', err, '\n 错误上下文：\n', ctx, '\n');
});

module.exports = app;

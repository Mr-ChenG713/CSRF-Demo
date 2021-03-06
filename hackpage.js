const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const router = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');

const staticPath = './static'


app.use(bodyParser());

app.use(static(
  path.join( __dirname,  staticPath)
));


app.use(router.routes()).use(router.allowedMethods());

// hack portal server é 3001
app.listen(3001, () => {
    console.log('Hack Page server is starting at port 3001');
});
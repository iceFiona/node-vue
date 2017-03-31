
const Koa = require('koa');
const path = require('path');

const router = require('koa-router')();// 注意require('koa-router')返回的是函数:
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');  // koa模板引擎:

const app = new Koa();

const root = path.join(__dirname,'../');
const src = path.join(__dirname,'../src');

const koaStatic = require('@server/static');//本地文件引用
const evn = process.env.NODE_ENV; //环境变量
const webpack_server = require('./webpack/dev-server'); //dev webpack服务

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

//ejs 渲染引擎配置
render(app, {
  root: src,
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});

//koa服务引用静态文件
app.use(koaStatic(root));

//路由渲染
router.get('/', async (ctx, next) => {
    await ctx.render('/index')
});

//开发环境的时候引入webpack开发服务
if(evn == 'development'){
  webpack_server(app);
}

// add router middleware:
app.use(router.routes());

app.listen(8000);

console.log('app started at port 8000...');


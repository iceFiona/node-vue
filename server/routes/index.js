 module.exports = function(app,koaRoute){
    koaRoute.get('/index',async (ctx, next) => {
        ctx.body="hello world"; 
    });
    
    app.use(koaRoute.routes())
        .use(koaRoute.allowedMethods());
}
var webpack = require('webpack'),
    config = require('./webpack.dev.conf')

var compiler = webpack(config);

module.exports = function(app){

    // serve webpack bundle output
    app.use(require('koa-webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));

}

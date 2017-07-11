const express = require('express');
const path = require('path');

const renderPage = require('./routes.Server.js').renderPage;

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  });

function getAssetManifest() {
  const content = webpackDevMiddleware.fileSystem.readFileSync(__dirname + '/../build/asset-manifest.json');
  return JSON.parse(content);
}

const app = express();

let assetManifest = null;
const aaaa= require('./mock/h51.json')
console.log('aaaa============'+aaaa)
app.use(express.static(path.resolve(__dirname, '../build')));

app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.use('/api/count', (req, res) => {
  // dev下,没有跨域限制  cors
    //Access-Control-Allow-Credentials:true 是否允许请求带有验证信息
    //Access-Control-Allow-Headers:* 允许自定义的头部，以逗号隔开，大小写不敏感
    //Access-Control-Allow-Methods:* 允许使用的请求方法，以逗号隔开
    //Access-Control-Allow-Origin:http://www.juzizixun.com
  res.header("Access-Control-Allow-Origin", "*")
  setTimeout(()=>{res.json({count: 100});},5000)
});
app.use('/api/h51', (req, res) => {
    // dev下,没有跨域限制  cors
    //Access-Control-Allow-Credentials:true 是否允许请求带有验证信息
    //Access-Control-Allow-Headers:* 允许自定义的头部，以逗号隔开，大小写不敏感
    //Access-Control-Allow-Methods:* 允许使用的请求方法，以逗号隔开
    //Access-Control-Allow-Origin:http://www.juzizixun.com
    res.header("Access-Control-Allow-Origin", "*")
    console.log(123123123123)
    // res.header("Content-Type", "application/json");
    res.json(JSON.stringify(require('./mock/h51.json')));
});
app.get('*', (req, res) => {
  if (!assetManifest) {
    assetManifest = getAssetManifest();
  }
  // 任何情况下，都返回match的路由
  return renderPage(req, res, assetManifest);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;

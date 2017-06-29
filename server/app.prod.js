const express = require('express');
const path = require('path');
const renderPage = require('./routes.Server.js').renderPage;

const app = express();

// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// 在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。
const assetManifest = require(path.resolve(__dirname, '../build/asset-manifest.json'));

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api/count', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.json({count: 100});
});

app.get('*', (req, res) => {
  // 任何情况下，返回match的路由
  return renderPage(req, res, assetManifest);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;

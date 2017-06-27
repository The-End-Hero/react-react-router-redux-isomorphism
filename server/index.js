// babel-register在node中使用babel，毕竟node8才开始支持import
// isomorphoc-fetch 同构的fetch，支持前后端
require('babel-register');
require('isomorphic-fetch');

// 根据环境变量加载对应环境的js
const isProductionMode = (process.env.NODE_ENV === 'production');
const app = isProductionMode ? require('./app.prod.js'): require('./app.dev.js');

if (!isProductionMode) {
  process.env.NODE_ENV = 'development';
}

const PORT = process.env.PORT || 9000;

// 打印当前运行环境，监听端口
app.listen(PORT, function() {
  console.log('running in ' + (isProductionMode ? 'producition' : 'development') + ' mode');
  console.log('listening on port: ' + PORT);
});

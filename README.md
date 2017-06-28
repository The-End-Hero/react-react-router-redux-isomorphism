package.json中的脚本部分已经默认在命令前添加了node_modules/.bin路径，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录

webpack devtool(Source Maps)

要运行npm run start_prod 需要先npm run build
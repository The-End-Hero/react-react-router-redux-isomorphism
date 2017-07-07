

### express相关
    get是一种特殊的use

### package.json相关

    package.json中的脚本部分已经默认在命令前添加了node_modules/.bin路径，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。
    --save是写入dependencies，--save-dev是写入devDependencies
    


### webapck相关

    '_dirname'是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    webpack devtool(Source Maps)
    要运行npm run start_prod 需要先npm run build（config/webpack.config.prod.js中fileName: 'asset-manifest.json'在build目录下）


### pm2运行

    已将pm2写入到package.json中去，具体配置文件参考processes.json
    运行 npm run pm2 即运行pm2
    pm2 本身命令
    pm2 delete all 删除所有运行或者停止或者错误的进程
    pm2 logs 查看日志
    pm2 list 查看所有进程
    pm2 stop all 停止所有进程
    pm2 start 相对路径地址 -i 0 // 0启动cpu最大核心数的进程

### styled-components

    css-in-js方案之一
    语法类似scss
    V2版本支持SSR，目前已经集成
    V2版本还支持next.js
    支持props操作
    尽量使用class extends React.Component; const xx = ()=>{}等方法在Refs方式下容易出错




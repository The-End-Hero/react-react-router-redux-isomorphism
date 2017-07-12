webstrom中setting-->system settings-->safe write 勾选关掉，这样容易触发项目的HMR
src/Routes.js   server/Routes.server.js  
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

-   css-in-js方案之一

-   语法类似scss

-   V2版本支持SSR，目前已经集成

-   V2版本还支持next.js

-   支持props操作

-   尽量使用class extends React.Component; const xx = ()=>{}等方法在Refs方式下容易出错

   -   函数式定义的无状态组件
       - 在大部分React代码中，大多数组件被写成无状态的组件，通过简单组合可以构建成其他的组件等；这种通过多个简单然后合并成一个大应用的设计模式被提倡。
       - 组件不会被实例化，整体渲染性能得到提升
       - 因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
       - 组件不能访问this对象
       - 无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件
       - 组件无法访问生命周期的方法
       - 因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。
       - 无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用

   -   es5原生方式React.createClass定义的组件
       - 即将被淘汰

   -   es6形式的extends React.Component定义的组件
       - 牛逼

- React.createClass与React.Component区别

    -   函数this：
        -   createClass自动绑定this，Component则需要手动绑定
        -   Component有三种手动绑定方法：
            -   构造函数中，用xxxx.bind(this)
            -   箭头函数
            -   用bind来绑定
    -   组件初始化state的配置不同
        -   createClass通过getInitialState来配置
        -   Component在constructor中初始化组件属性
    -   Mixins的支持
        -   createClass支持Mixins
        -   Component不支持，替代方案**Higher-Order Components**

-   尽量使用无状态组件和Components来创建组件。


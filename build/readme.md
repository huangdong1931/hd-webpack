# build 文件说明
|  build.js  // 打包入口文件
|  check-versions.js // npm、node 版本检查脚本
|  create-proxy.js // 生成 proxy.js 脚本
|  dev-server.js // 开发环境启动本地服务
|  proxy.js // 通过 create-proxy.js 创建出的 请求代理文件
|  webpack.base.conf.js // webpack 公共配置文件
|  webpack.dev.conf.js // webpack dev环境配置文件
|  webpack.prod.conf.js // webpack 生产环境配置文件
|  webpack.dll.conf.js // dll 优化文件

# 指令
````pnpm 启动(推荐)````
pnpm dev // 启动本地服务
pnpm build:<envConfig> // 进行 prod 构建，envConfig 目的是根据不同环境额外添加全局指令进行配置
````npm 启动````
npm run dev
npm run build:<envConfig>

# 构建路线分析
````启动本地服务````
通过 pnpm dev 指令执行 dev-server.js 脚本 
1. 检查是否存在 proxy.js 文件，没有就创建有就直接跳过，http-proxy-middleware 中间件需要用到 proxy.js
2. 检查使用的 node、npm 版本，是否符合项目 package.json 中 engines 字段配置的要求，不符合就终止服务
3. 定义本地服务所需常量，合并 webpack 公共配置文件
4. 创建本地 express 服务
5. 启用各种优化本地开发体验的中间件
6. 挂载静态资源到服务上
7. 监听端口，通过第三方模块 opn 自动打开本地服务

````生产环境打包````
1. 通过 pnpm build:<envConfig> 指令执行时，先通过 cross-env 根据不同环境将变量挂载到全局 process.env.NODE_ENV 上
2. 执行 build.js 脚本 
3. 检查 node、npm 版本号 不符合要求退出打包 符合继续往下
4. 在 prod 配置中 插入各种优化编译 plugin 和 自定义一些操作的 plugin
5. 合并打包配置，将 prod 和 base 配置合并
6. 通过 webpack(config) 进行编译

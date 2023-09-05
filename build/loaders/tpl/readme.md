# 自定义 loader
背景: 由于 webpack 本身只认识js,json格式的文件，所以处理其他文件类型需要头颈癌loader来处理

loader 本质上是一个函数 webpack4以前 该函数的输入和输出必须为字符串 webpack4以后支持抽象语法树的传递 通过这种方法来减少重复的代码解析

`` const output = loader(input) ``

这里的 input 输入是一个字符串的文件资源 或者是 一个loader转化后的结果 可能是字符串 source map 抽象语法树对象

<script>
  // loader 源代码
  module.exports = function loader(content, map, meta) {
    var callback = this.async();
    var result = handler(content, map, meta);
    callback(
      null, //error
      result.content, //转换后的内容
      result.map, //转换后的source-map
      result.meta, //转换后的AST
    );
  }
</script>

output 和 input一致

如果是很多loader，则处理过程是从右往左，从下往上依次去执行loader的结果，直到最后一个loader处理完将结果丢给 webpack 进行后续处理

自定义loader在webpack中配置又四种方式
<script>
  // 1. 在配置 rules 的时候直接指定 loader 的绝对路径
  module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          // 在这里配置绝对路径
          use: path.resolve(__dirname, 'loaders/myLoader.js')
        }
      ]
    }
  }
  // 2. 或者在 resolveLoader 里配置 alias 别名
  module.exports = {
    // 配置 resolveLoader.alias
    resolveLoader: {
      alias: {
        myLoader: path.resolve(__dirname, 'loaders/myLoader.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'myLoader'
        }
      ]
    }
  }
  // 3. 还可以在 resolveLoader 里配置 modules 属性
  module.exports = {
    // 配置 resolveLoader.modules
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'myLoader'
        }
      ]
    }
  }
  // 4. 还可以使用 npm link
  // 把 loader 从当前项目抽离出来，构建独立工程。
  // 在 loader 工程目录下执行 npm link;
  // 回到原项目目录，执行 npm link xxx (xxx为loade  r的名称)。
  // 最后，在原项目使用时，直接使用名称即可 (跟 npm install 的 loader 一样使用)。
</script> 
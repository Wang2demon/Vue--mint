const path = require('path')

const webpack = require('webpack')
// 导入在内存中生成HTML页面的插件
// 只要是插件，都一定要放到 plugins 节点中去
// 这个插件的两个作用：
// 1. 自动在内存中根据指定页面生成 一个内存中的页面
// 2. 自动， 吧打包好的 bundle.js 追加到页面中去
const htmlWebpackplugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('./node_modules/vue-loader/lib/plugin')

// const babelComponent = require('./node_modules/babel-plugin-component')

// 这个配置文件起始就是一个js文件， 通过node中的模块操作， 向外暴露一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), // 入口，表示要使用webpack打包哪个文件
    output: {  // 输出文件相关的配置
        path: path.join(__dirname, './dist'),  // 指定打包好的文件，输出到哪个目录
        filename: 'bundle.js'       // 这是指定输出的文件的名称
    },
    devServer: {  // 配置dev-server 命令参数的第二种形式， 相对来说，这种方式麻烦一些
        // --open --port 3000 --contentBase src
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(),  //新建一个热更新的模块对象，这是启用热更新
        new htmlWebpackplugin({  // 创建一个在内存中  生成 HTML 页面的插件
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'   //指定生成的页面的名称
        }),
        new VueLoaderPlugin(),
        // new babelComponent()
    ],
    module: { // 这个节点，用于配置所有第三方模块 加载器
        rules: [  // 所有第三方模块的匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']}, //配置处理。css文件的第三方loader规则
            {test: /\.scss$/, use: ['style-loader', 'css-loader','sass-loader']},
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.(jpg|png|gif|bmp|svg)$/, use: 'url-loader'}, // 处理图片路径的loader
            {test: /\.(woff|woff2|ttf|eot)$/, use: 'file-loader'}, // 处理字体文件的loader
            {test: /\.js$/, exclude: /node_modules/,loader: "babel-loader"}
        ]
    },
    resolve: {
        alias: {  // 修改 vue 被导入时候的包的路径
            // 'vue$': 'vue/dist/vue.js'
        }
    }

}


// 当我们在控制台， 直接输入webpack命令执行的时候， webpack会执行下面几步：
// 1. 首先， webpack 发现，我们并没有通过命令的形式，给他指定入口和出口
// 2. webpack 就会去项目的根目录中查找一个叫做 ’webpack.config.js‘的配置文件
// 3. 当找到配置文件后， webpack 会去解析执行这个配置文件， 当解析执行完配置文件后， 就会得到配置文件中到处的配置对象
// 4. 当webpack 拿到配置对象后， 就拿到了配置对象中，指定的入口和出口，然后进行打包构建
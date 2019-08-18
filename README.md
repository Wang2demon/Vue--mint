# 基于Vue 框架开发的项目

## api接口地址
新闻列表
http://www.liulongbin.top:3005/api/getnewslist

商品列表
http://www.liulongbin.top:3005/api/getgoods?pageindex=1


## 用传统方式（命令行）把修改过的代码上传到码云
1. git add .
2. git commit -m "提交信息1"
3. git push


## 制作首页App组件
1. 完成Header 区域， 使用的是 Mint-UI 中的Header 组件
2. 制作底部的 Tabbar 区域，使用的是MUI 的Tabbar.html
    + 在制作购物车小图标的时候，操作会相对多一些：
    + 先把扩展图标的 css 样式，拷贝到项目中 
    + 拷贝字体库的ttf文件到项目中
    + 为购物车小图标，添加如下样式 mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接 ，展示对应的路由组件

## 制作首页轮播图布局

##  加载首页轮播图数据
1. 获取数据， 使用vue-resource
2. 使用 vue-resource 的this.$http.get 获取数据
3. 获取得到的数据， 要保存到data身上
4. 使用v-for 循环渲染每个item

## 改造 九宫格 区域的样式

## 改造 新闻资讯路由 链接

## 新闻资讯 页面制作
1. 绘制页面， 使用MUI中的media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时在跳转的时候应提供唯一的ID标识符
2. 创建新闻详情ed组件页面 NewsInfo.vue
3. 在路由模块中， 将新闻详情的路由地址 和组件页面对应起来

## 实现 新闻详情 的页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中， 先手动导入 comment 组件
    + `import comment from './comment.vue'`
3. 在父组件中，使用`components` 属性，将刚导入的 comment 组件，注册为自己的子组件
4. 将注册子组件时候的，注册名称， 以标签形式在页面中引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多
1. 为加载更多按钮， 绑定点击事件， 在事件中请求下一页数据
2. 点击加载更多， 让 pageIndex ++ ， 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况， 我们在点击加载更多的时候， 每当获取到新数据， 应该让老数据调用数组的concat方法，拼接数组


## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast 提示用户 评论内容为空
4. 通过 vue-resource 发送一个请求， 把评论内容提交给 服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论
    + 如果调用 getComments方法重新刷新评论列表的话， 可能只能得到最后一页的评论，前几页的评论获取不到
    + 换一种思路， 当评论成功后， 在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到 data 中comments开头；这样，就能完美实现刷新评论列表的需求；

## 改造图片分析 按钮为路由的链接 并显示对应组件页面

## 绘制图片列表 组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作 底部的图片列表

### 制作顶部滑动条的坑
1. 借助于 MUI 中的 tab-top-webview-main。html
2. 需要把slider区域中的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动， 通过检查官方文件， 发现这是JS组件，需要初始化：
    + 导入 mui.js
    + 调用官方提供的方式初始化
    ```
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    ```
4. 我们在初始化滑动条的时候，导入了mui.js ， 但是报错Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
    + 经过推测， 可能是mui.js 中用到了 'caller', 'callee', and 'arguments'， 但是，webpack 打包好的bundle。js中， 默认是启用严格模式的，所有这两者冲突：
    + 解决方案： 1. 把mui.js 中的非严格模式代码改掉；不现实；2. 把webpack打包时候的严格模式禁用掉
    + 方案2：可以使用@babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode两个插件，
    npm i @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode -D
    在.babelrc文件中的plugins中添加
    ["@babel/plugin-transform-modules-commonjs", {"strictMode": false}]
5. 刚进入图片分享页面的时候， 滑动条无法正常工作， 经过发现， 如果要初始化滑动条，必须等DOM元素加载完毕，所有把初始化滑动条的代码，搬到了mounted 生命周期函数中；
6. 当 滑动条 调试OK 后， tabbar 无法正常工作， 这时候， 我们需要把每个 tabbar按钮中的样式中的‘mui-tab-item’重新改一下名字
7. 获取所有分类， 并渲染分类列表；

### 制作图片列表区域
1. 图片列表需要懒加载技术， 我们可以使用Mint-UI提供的现成组件‘lazy-load’
2. 根据‘lazy-laod’的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了 点击图片跳转到图片详情页面
1. 在改造 li 成 router-link 的时候， 需要使用 tag 属性指定要渲染成 哪种 元素

## 实现详情页面的布局和美化， 同时获取数据渲染页面

## 实现图片详情中 缩略图的功能
1. 使用插件 vue-preview 这个缩略图插件 (插件用法有所改变)
2. 获取到所有的图片列表， 然后使用 v-for 指令渲染数据
3. 注意：img 标签上的class不能去掉
4. 注意：每个图片数据对象中， 必须有w和h属性

## 绘制商品列表 页面基本结构和美化

## 尝试在手机傻瓜 去进行项目的预览和测试
1. 保证自己的手机可以正常运行
2. 保证 手机和开发项目的电脑处于同一个局域网， 
3. 打开自己项目的 package.json 文件，在dev脚本中，添加一个 --host 指令，把当前电脑的WIFI IP地址，设置为 --host 的指令值；
    


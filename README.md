# 基于Vue 框架开发的项目



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








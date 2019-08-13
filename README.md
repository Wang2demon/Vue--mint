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












//  入口文件
import Vue from 'vue'
// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car") || '[]')
var store = new Vuex.Store({
    state: {    //this.$store.state.***
        car: car   //将购物车中的商品的数据，用一个数组存储， 在car数组中存储一些商品的对象， 咱们可以商品对象设计成这个样子  {id: 商品id， count：要购买的数量，price：商品的单价，selected： false}
    },
    mutations: {    // this.$store.commit('方法名称'， ’唯一的参数‘)
        addToCar(state, goodsinfo){
            // 点击购物车，把商品信息保存到state中的car上
            // 分析： 
            // 1. 如果购物车之前就已经有这个对应的商品了， 那么只需要更新商品
            // 2. 如果没有，则直接把商品数据，push到car中即可

            // 假设在购物车中没有找到， 对应商品
            var flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            if(!flag) {
                state.car.push(goodsinfo)
            }

            // 当更新car之后， 把 car数组，存储到本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo){
            // 修改购物车中商品的数量值
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量， 把最新的购物车数据保存到本地存储
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeFormCar(state, id){
            // 根据id， 从store中的购物车中删除对应的那条商品数据
            state.car.some((item, i)=>{
                if(item.id == id){
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将删除完毕后的最新购物车数据，同步到本地存储中
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        
    },
    getters: {  // this.$store.getters.***
        // 相当于计算属性， 也相当于 filter
        getAllCount(state){
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var obj = {}
            state.car.forEach(item => {
                obj[item.id] = item.count
            })
            // console.log(obj)
            return obj
        },
        getGoodsSelected(state){
            var o ={}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count
                    o.amount += item.count * item.price
                }
            })
            return o
        }
    }
})

// 导入格式化时间插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})


// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
// 设置 post 时表单数据格式组织形式 application/x-www-form-urlencoded
import './lib/mui/css/icons-extra.css'


// 导入 mint-ui 样式
import '../node_modules/mint-ui/lib/style.css'
// 按需导入 Mint-ui 中的组件
import {Header, Swipe, SwipeItem, Button,Lazyload,Switch} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
Vue.component(Switch.name, Switch);

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 1.3 导入自己的 router。js 路由模块
import router from './router.js'

import app from './App.vue'

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,   // 1.4 挂载路由对象到vm实例上
    store     //状态管理对象
})
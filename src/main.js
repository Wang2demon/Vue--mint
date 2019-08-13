//  入口文件
import Vue from 'vue'

// 导入MUI的样式
import './lib/mui/css/mui.min.css'


// 导入 mint-ui 样式
import '../node_modules/mint-ui/lib/style.css'
// 按需导入 Mint-ui 中的组件
import {Header} from 'mint-ui'
Vue.component(Header.name, Header)

import app from './App.vue'

var vm = new Vue({
    el: "#app",
    render: c => c(app)
})
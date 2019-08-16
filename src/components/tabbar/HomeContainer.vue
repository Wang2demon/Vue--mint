<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用 v-for 循环的话，一定要使用 key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格 到 6宫格改造-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                    <div class="mui-media-body">图片分享</div></router-link>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div></router-link>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></a>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-search"></span>
            <div class="mui-media-body">视频专区</div></a>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-phone"></span>
            <div class="mui-media-body">联系我们</div></a>
            </li>
            
        </ul> 

        
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return {
            lunbotuList: []  //保存轮播图的数组
        }
    },
    created(){
        this.getLunbotu()
    },
    methods: {
        getLunbotu(){
            // 获取轮播图数据的方法
            this.$http.jsonp('api/getLunbo').then( result => {
                // console.log(result.body)
                if (result.body.status === 0){
                    // 成功
                    this.lunbotuList = result.body.message

                }else{
                    // 失败
                    Toast('加载轮廓图失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color: red;
            }
            &:nth-child(2){
                background-color: blue;
            }
            &:nth-child(3){
                background-color: cyan;
            }

            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .mui-table-view.mui-grid-view{
        background-color: #fff;
        border: none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }
</style>


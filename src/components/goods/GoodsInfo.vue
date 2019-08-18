<template>
    <div class="goodsinfo-container">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotulist="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>   
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>  
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addToShopCar" >加入购物车</mt-button>   

                    <!-- 分析：如何实现加入购物车时候， 拿到选择的数量 -->
                    <!-- 1. 经过分析发现： 按钮属于 goodsinfo页面 ， 数字属于 numberbox 组件， -->
                    <!-- 2. 由于涉及到了父子组件的嵌套， 所以，无法直接再goodsinfo页面中获取选中的商品数量 -->
                    <!-- 3. 怎么解决： 涉及到了 子组件向父组件传值（事件调用机制） -->
                    <!-- 4. 事件调用的本质： 父向子传递方法，子调用该方法，同时把数据当作参数 传递给这个方法 -->

                </div>
            </div>
        </div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="primary" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
// 导入轮播图组件, 数字选择框组件
 import swiper from '../subcomponents/swiper.vue'
 import numbox from '../subcomponents/goodsinfo_numbox.vue'


export default {
    data(){
        return {
            id: this.$route.params.id, // 路由参数id
            lunbotu: [],    // 轮播图的数据
            goodsinfo: {},  //  商品信息
            ballflag: false,  // 控制小球的隐藏和显示的标识符
            selectedCount: 1,  //保存用户选中的商品数量
        }
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.img = item.src
                    });
                    this.lunbotu = result.body.message
                }
            })
        },
        getGoodsInfo(){
            // 获取商品信息
            this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0]
                }
            })
        },
        goDesc(id){
            // 点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({name: 'goodsdesc', params: {id}})
        },
        goComment(id){
            // 点击使用编程式导航跳转到 商品评论页面
            this.$router.push({name: 'goodscomment', params: {id}})

        },
        addToShopCar(){
          // 添加到购物车
           this.ballflag = !this.ballflag 
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        enter(el, done){
            el.offsetHeight

            // 小球动画优化思路：
            // 1. 先分析导致动画不准确的本质原因：我们把小球最终位移的位置，局限在了某个分辨率下的 滚动条未滚动的情况下；
            // 2.只要分辨率和测试时不一样，或者滚动条滚动一定距离，问题就会出现；
            // 3. 因此， 我们经过分析， 得到结论; 不能把位置的横纵坐标直接写死，而是根据不同情况，动态计算坐标值；
            // 4. 经过分析， 得出思路， 先得到徽标的横纵坐标， 再得到小球的横纵坐标，然后求横纵坐标的差值，就是要位移的距离
            // 5. 如何获取 徽标和 小球的位置：  domObject.getBoundingClientRect()

            // 获取小球再页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            // ES6 模板字符串 ``：用于拼接字符串
            el.style.transform = `translate(${xDist}px, ${yDist}px)`
            el.style.transition = "all 1s ease "
            done()
        },
        afterEnter(el){
            this.ballflag = !this.ballflag
        },
        getSelectedCount(count){
            // 当子组件 把选中的数量传递给父组件的时候， 把选中的值保存在data上
            this.selectedCount = count
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        left: 145px;
        top: 390px;
    }
    
</style>
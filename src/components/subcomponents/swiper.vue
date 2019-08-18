<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用 v-for 循环的话，一定要使用 key -->
            <!-- 将来谁使用才轮播图，谁为我们传递 lunbotulist -->
            <!-- 此时， lunbotulist 应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotulist" :key="item.url">
                <img :src="item.img" alt="" :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunbotulist", "isfull"]
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
        
            img{
                // width: 100%;
                height: 100%;
            }
        }
    }
    .full {
        width: 100%;
    }
</style>
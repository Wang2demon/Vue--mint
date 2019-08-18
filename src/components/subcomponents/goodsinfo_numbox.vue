<template>
<!-- 问题： 不知道什么时候能够拿到 max 值， 但是总有一刻能得到一个真正的max值 -->
<!-- 我们可以使用 watch 属性监听， 来监听 父组件传递过来的 max 值， 不管 watch 会被触发几次， 但是最后一次，肯定是一个合法的max 数值 -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted(){
        mui('mui-numbox').numbox() // 初始化数字选择框组件
    },
    methods: {
        countChanged(){
            // console.log(this.$refs.numbox.value)
            this.$emit('getcount', parseInt(this.$refs.numbox.value))
        }
    },
    props: ["max"],
    watch: {
        // 属性监听
        'max': function(newVal, oldVal){
            // 使用JS API 设置 numbox
            mui(".mui-numbox").numbox().setOption('max', newVal)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
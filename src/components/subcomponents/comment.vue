<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" placeholder="请输入内容(最多120字)" maxlength="120"></textarea>

        <mt-button type="primary" small="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined'? '此用户很懒，什么都没说': item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" small="large" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return{
            pageIndex: 1, //默认展示第一页数据
            comments: [] //所有的评论数据
        }
    },
    created(){
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get('api/getcommemts/'+ this.id +'?pageindex='+ this.pageIndex).then(result => {
                if(result.body.status === 0){
                    // this.comments = result.body.message
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    Toast('获取评论失败！')
                }
            })
        },
        getMore(){ // 加载更多
            this.pageIndex ++
            this.getComments()
        },
    },
    props: ["id"]
}
</script>

<style lang="scss" scped>
    
</style>
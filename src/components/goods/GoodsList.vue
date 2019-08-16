<template>
    <div class="goods-list">

        <div class="goods-item">
            <img src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b230ae9b4bdd0ba08cd93fc1b7173dfa.jpg?thumb=1&w=358&h=508" alt="">
            <h1 class="title">小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥1522</span>
                    <span class="old">￥2510</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b230ae9b4bdd0ba08cd93fc1b7173dfa.jpg?thumb=1&w=358&h=508" alt="">
            <h1 class="title">小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥1522</span>
                    <span class="old">￥2510</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b230ae9b4bdd0ba08cd93fc1b7173dfa.jpg?thumb=1&w=358&h=508" alt="">
            <h1 class="title">小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥1522</span>
                    <span class="old">￥2510</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{              
                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;

                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }


        }
    }
</style>
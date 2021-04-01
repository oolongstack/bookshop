<template>
    <div class="goodslistitem" @click="itemClick">
        <img v-lazy="product.cover_url" alt="">
        <div class="goodsinfo">
            <p>{{product.title}}</p>
            <span class="price"><small>￥</small>{{product.price}}</span>
            <span class="collect">{{product.collects_count}}</span>    
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'
export default defineComponent({
    name:'GoodsListItem',
    props: {
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    setup(props) {
        const router = useRouter();
        return {
            itemClick:()=>{
                router.push({
                    path:'/detail',
                    query:{
                        id:props.product.id    
                    }
                })
            }    
        }
    }
    
})
</script>
<style scoped lang='scss'>
.goodslistitem{
    position: relative;
    width: 48%;
    padding-bottom: 40px;
    img{
        width: 100%;
        border-radius:10px;
    }
    .goodsinfo{
        position: absolute;
        font-size: 12px;
        left: 0;
        right: 0;
        bottom: 5px;
        overflow: hidden;
        text-align: center;
        p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom:3px;
        }
        .price{
            color:red;
            margin-right:20px;
        }
        .collect{
            position: relative;
        }
        .collect::before{
            content: '';
            position: absolute;
            width:14px;
            height:14px;
            left: -15px;
            top: -1px;
            background: url('~assets/img/collect.png') 0 0/14px 14px;
        }
    }
}
</style>
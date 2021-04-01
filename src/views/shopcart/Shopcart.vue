<template>
  <div id="shopcart">
    <top-bar>
      <template v-slot:default>购物车( <span style="color:#fff">{{$store.state.cartCount}}</span> )</template>
    </top-bar>
    <div class="cart-box">
     
        <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup" v-model="result" @change='groupChange'> 
            <van-swipe-cell :right-width="50" v-for="(item,index) in list" :key="index">
               <div class="good-item">
                    <van-checkbox :name='item.id' />
                    <div class="good-img"><img :src="item.goods.cover_url" alt=""></div>
                    <div class="good-desc">
                        <div class="good-title">
                            <span>{{item.goods.title}}</span>
                            <span>{{item.goods.stock}}</span>
                        </div>
                        <div class="good-btn">
                           <div class="price"><small>￥</small>{{item.goods.price+'.00'}}</div>
                           <van-stepper integer :min='1' :max='item.goods.stock' :model-value='item.num' :name='item.id' async-change 
                           @change="onChange"/>
                        </div>
                    </div>
               </div>
                <template #right>
                    <van-button square icon='delete' type='danger' class="delete-button" @click="delGood(item.id)"/>
                </template>
            </van-swipe-cell>
        </van-checkbox-group>
      </div>
     
        <van-submit-bar class="submit-all" :price="total*100" button-text="结算" @submit="onSubmit">
            <van-checkbox v-model:checked="checkAll" @click="allCheck">全选</van-checkbox>
        </van-submit-bar> 
        <div class="empty" v-if="!list.length">
            <img class="empty-cart" src="~assets/img/nike.png" alt="空购物车">
            <div class="title">购物车空空如也</div>
            <div><van-button round color='#1baeae' type='primary' @click="goToShop">前往选购</van-button></div>
        </div>  
    </div>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";

import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getCart,deleteCartItem,checkedCart,modifyCart} from 'network/cart'
import {Toast} from 'vant'
import { defineComponent ,ref ,reactive,onMounted,computed,toRefs} from "vue";
export default defineComponent({
  name: "Shopcart",
  components: {
    TopBar,
    
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const checkboxGroup = ref(null);
    //数据模型
    const state = reactive({
        list:[],
        result:[],
        checkAll:true
    })
    //初始化购物车数据
    const init=()=>{
        Toast.loading({message:'加载中...',forbidClick:true})

        getCart('include=goods').then(res=>{
            // console.log(res.data);
            state.list = res.data
            //得到选中的商品的id
            state.result = res.data.filter(n=>n.is_checked==1).map(n=>n.id)
            Toast.clear()
        })
        
    }
    //复选框改变处理 
    const groupChange=(result)=>{
        // console.log(result)
        state.result = result
        //页面改变 调用接口改变服务器  改变数据表中的选中状态
        checkedCart({cart_ids:result})
        //判断选中数和购物车数据总数是否一样 若不一样取消全选
        if(result.length == state.list.length){
            state.checkAll= true
        }else{
            state.checkAll = false
        }
    }
    //处理全选按钮{}
    const allCheck = ()=>{
        // state.checkAll = !state.checkAll
        if(!state.checkAll){
            state.result = state.list.map(n=>n.id)
            state.checkAll = true
        }else{
            state.result = []
            state.checkAll = false
        }
    }
    //删除商品
    const delGood =(id)=>{
        deleteCartItem(id).then(res=>{
            init();//重新初始化
            store.dispatch('updateCart') //改变vuex中的状态数量
        })
    }
    //计算总价 选中的 以及数量
    const total = computed(()=>{
        let sum = 0
        //
        state.list.filter(item=> state.result.includes(item.id))
        .forEach(item =>{
            sum += parseInt(item.num)  * parseFloat(item.goods.price)
        })
        return sum
    })
    //生成订单
    const onSubmit = ()=>{
        if (state.result.length == 0) {
            Toast.fail('您还未选择商品哦')
            return
        }else{
            router.push({path:'/createorder'})
        }
    }
    //异步改变购物车数据库数量
    //vant组件自带value就是动态绑定的model-value可以得到目前的数目 detail.name为商品ID
    const onChange=(value,detail)=>{
        //避免用户点击太快造成死锁 点击前提示修改中点击后再清除提示
        Toast.loading({message:'修改中...',forbidClick:true})
        modifyCart(detail.name,{num:value}).then(res=>{
            //此时改变了数据库里的购物车数据，但未改变页面的 所以onMounted里的state.list中的num也要改变才行
           state.list.forEach(item=>{
               if(item.id == detail.name){
                   item.num = value
               } 
               Toast.clear()
           }) 
        })
    }
    onMounted(() => {
        init()
    })
    //前往购物
    const goToShop=()=>{
        router.push({path:'/home'})
    }
    return {
      checkboxGroup,
      ...toRefs(state),
      goToShop,
      onChange,
      groupChange,
      allCheck,
      delGood,
      total,
      onSubmit
    };
  },
});
</script>
<style scoped lang="scss">
#shopcart{
    position: relative;
    padding-top: 49px;
}
.cart-box{
    height: 100vh;
}
.van-button{
    height: 100px;
}
.empty{
    position: fixed;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .title{
        color: red;
    }
    .van-button{
        margin-top:10px;
        width: 160px;
        height: 50px;
    }
}
.good-item{
    display: flex;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #ccc;
    .van-checkbox{
        width: 10%;
        margin-left: 10px;
    }
    .good-img{
        width: 30%;
       
        img{
            text-align: center;
            margin-bottom: 5px;
        }
    }
    .good-desc{
        flex: 1;
        display: flex;
        padding: 10px;
        flex-direction: column;
        >div{
            flex: 1;
        }
        .good-title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
        }
        .good-btn{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price{
                color: red;
            }
        }
    }

}
.submit-all{
    margin-bottom:50px
}
</style>
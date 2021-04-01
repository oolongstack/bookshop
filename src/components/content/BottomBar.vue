<template>

<div class="bottombar">
    
   <router-link to="/home" class="bottomitem">
   <div class="icon"><i class="iconfont icon-home"></i></div>
   <div>首页</div>
   </router-link>
   <router-link to="/category" class="bottomitem">
   <div class="icon"><i class="iconfont icon-xianxingtubiaozhizuomoban-36"></i></div>
   <div>分类</div>
   </router-link>
   <router-link to="/shopcart" class="bottomitem">
   <div class="icon">
    <van-badge :content="$store.state.cartCount" max="9">
      <i class="iconfont icon-gouwuche"/>
    </van-badge>
   </div>
   <div>购物车</div>
   </router-link>
   <router-link to="/profile" class="bottomitem">
   <div class="icon"><i class="iconfont icon-yonghu"></i></div>
   <div>我的</div>
   </router-link>
</div>
</template>
<script>
import {useStore} from 'vuex'
import { defineComponent ,onMounted} from 'vue'
export default defineComponent({
    name:'BottomBar',
    setup(props) {
        const store = useStore();
        onMounted(()=>{
            store.dispatch('updateCart')
        })
        return{

        }
    }
})
</script>
<style scoped>
.bottombar{
  position:fixed;
  display:flex;
  left:0;
  bottom:0;
  right:0;
  height: 50px;
  box-shadow:0 -3px -1px  rgba(100, 100, 100, 0.9);
  background-color: #f6f6f6;
  z-index:10;
}
.bottomitem{
    flex: 1;
    text-align: center;
     
}
.router-link-active{
    color:var(--color-high-text)
}
.bottomitem .icon .iconfont{
    font-size: 24px;
}
.bottomitem .icon{
    margin-bottom:2px;
    margin-top: 2px;
}
</style>
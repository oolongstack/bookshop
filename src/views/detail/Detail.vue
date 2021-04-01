<template>
  <div class="detail">
    <top-bar>
      <template v-slot:left
        ><i class="iconfont icon-fanhui" @click="goBack"></i
      ></template>
      <template v-slot:default>商品详情</template>
    </top-bar>
    <div class="wrapper">
      <div class="contents">
        <van-image
        width="100%"
        height="350px"
        lazy-load
        :src="detail.cover_url"
      />
      <van-card
          :num="'推荐:'+detail.stock"
          :price="detail.price+'.00'"
          :desc="detail.description"
          :title="detail.title"
        >
          <template #tags>
            <van-tag plain type="danger">新书</van-tag>
            <van-tag plain type="danger">推荐</van-tag>
          </template>
          <template #footer>
            <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
            <van-button type="danger" @click="goToCart">立即购买</van-button>
          </template>
        </van-card>

        <van-tabs v-model="active">
            <van-tab title="概述">
                <div class="content" v-html="detail.details"></div>
            </van-tab>
            <van-tab title="热评">
                <div class="comments" v-for="item in detail.comments" :key="item"></div>
            </van-tab>
            <van-tab title="相关图书">
                <goods-list :goods='like_goods'></goods-list> 
            </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import GoodsList from 'components/content/goods/GoodsList'
import Bscroll from 'better-scroll'
import { useRouter ,useRoute} from "vue-router";
import {useStore} from 'vuex'
import { addCart } from 'network/cart'
import {getDetail} from 'network/detail'
import {Toast} from 'vant'
import { defineComponent ,ref ,onMounted, reactive ,toRefs ,nextTick,watchEffect} from "vue";
export default defineComponent({
  name: "Detail",
  components: {
    TopBar,
    GoodsList
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const active = ref(0);
    let bs = reactive({})
    let id = ref(2)
    //保存商品信息
    let book = reactive({
      detail: {},
      like_goods:[]
    }) 
    const goBack = () => {
      router.go(-1);
    };
    onMounted(() => {
         nextTick(()=>{
        //判断挂载 挂载完成再执行
         bs && bs.refresh();
        })
       id.value = route.query.id
        getDetail(id.value).then(res=>{
         book.detail = res.goods;
        //  console.log(res);
         book.like_goods = res.like_goods;
      })

      //初始化 滚动插件
      bs = new Bscroll(document.querySelector('.wrapper'),{
        probeType:3,
        click:true,
        pullUpLoad:true
      })
    })
    //添加购物车
    const handleAddCart=()=>{
      addCart({goods_id:book.detail.id,num:1}).then(res=>{
        if(res.status == 204 || res.status == 201){
            store.dispatch('updateCart')
            Toast.success('添加成功')
        }
      })
    }
    //立即购买
    const goToCart=()=>{
      addCart({goods_id:book.detail.id,num:1}).then(res=>{
        if(res.status == 204 || res.status == 201){
            store.dispatch('updateCart')
            Toast.success('添加成功,进入购物车')
            router.push({
              path:'/shopcart'
            })
        }
      })
      
    }
  watchEffect(()=>{
      //等待dom渲染完成后开始监听使用nextTick
      nextTick(()=>{
        //判断挂载 挂载完成再执行
       bs && bs.refresh();
      })
       })
    return {
      goBack,
      active,
      ...toRefs(book),
      handleAddCart,
      goToCart
    };
  },
});
</script>
<style scoped lang="scss">
.detail {
  position: relative;
  }
.icon-fanhui {
  margin-left: 20px;
}
// .content {
//   img {
//     max-width: 100%;
//   }
// }
.wrapper {
  position: absolute;
  top: 49px;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  
  .contents {
    width: 100%;
    height: calc(100vh - 99px);
    }
}
</style>
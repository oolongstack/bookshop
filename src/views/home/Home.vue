<template>
  <div id="home">
    <!-- 顶部-->
    <top-bar>
      <template v-slot:default>秃头图书</template>
    </top-bar>
    <!-- <tab-contral v-show="isTabFixed" :tabContral="['畅销','新书','精选']" @tabClick='tabclick'></tab-contral> -->
    <div class="wrapper">
     <div class="content">
       <div ref="tabHeight">
      <!--轮播图-->
    <div class="banners">
      <van-swipe
        class="my-swipe"
        :autoplay="2500"
        indicator-color="white"
        lazy-render
      >
        <van-swipe-item v-for="item in imgUrl" :key="item.id">
            <img v-lazy="item.img_url" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--推荐-->
    <Recommend :recommends='recommends'></Recommend>
       </div>
    <!--控制栏-->
    <tab-contral :tabContral="['畅销','新书','精选']" @tabClick='tabclick'></tab-contral>
    <goods-list :goods='showlist'></goods-list> 
     </div>
    </div> 
    <go-top v-show='showGoTop' @click="GoToTop"></go-top>  
  </div>
</template>
<script>
//引入组件
import TopBar from "components/common/topbar/TopBar";
import TabContral from 'components/content/tabContral/TabContral'
import Recommend from './childcomps/Recommend'
import GoodsList from 'components/content/goods/GoodsList'
import GoTop from 'components/common/gotop/GoTop'

//引入网络请求
import {getHomeData ,getHomeGoods} from 'network/home.js'
//引入插件
import Bscroll from 'better-scroll'
//引入组合API
import { defineComponent ,onMounted,ref,reactive,computed,watchEffect,nextTick} from "vue";

export default defineComponent({
  name: "Home",
  components: {
    TopBar,
    Recommend,
    TabContral,
    GoodsList,
    GoTop
    
  },
  setup(){
    //轮播图图片
    const imgUrl = ref([]);
    //推荐数据
    const recommends = ref([])
    //保存点击切换控制栏的index
    
    //保存tabContral栏数据
    const goods = reactive({
      sales:{page:1,list:[]},
      new:{page:1,list:[]},
      recommend:{page:1,list:[]},
    })
    //得知当前类型
    let currentType = ref('sales')
    //全局声明better-scroll
    let bs = reactive({})
    
    //获得轮播图和推荐高度
    let tabHeight =ref(null)
    //控制回到顶部组件
    let showGoTop = ref(false)
    //点击回到顶部功能
    const GoToTop = ()=>{
        bs.scrollTo(0,0,1000)
    }
    //计算得知当前所需类型
    const showlist = computed(()=>{
        return goods[currentType.value].list
    })
    onMounted(() => {
     
      //初始化better-scroll
      bs = new Bscroll(document.querySelector('.wrapper'),{
        probeType:3,
        click:true,
        pullUpLoad:true
      })
      bs.on('scroll', (position)=>{
      showGoTop.value = (-position.y) > 1800
      // isTabFixed.value = (-position.y) > tabHeight.value.offsetHeight
      })
      bs.on('pullingUp',()=>{
            nextTick(()=>{
        //判断挂载 挂载完成再执行
         bs && bs.refresh();
          })
      //首先获取是在哪个类型里面上拉的
        const page = goods[currentType.value].page + 1 
        getHomeGoods(currentType.value,page).then(res=>{
            goods[currentType.value].list.push(...res.goods.data);
            goods[currentType.value].page +=1;
            bs.finishPullUp()
        })
            nextTick(()=>{
        //判断挂载 挂载完成再执行
       bs && bs.refresh();
      })
      })
      //获取整个页面数据
          getHomeData().then(res=>{
              const url = res.slides
              //轮播图数据
              imgUrl.value = url
              //推荐商品数据
              recommends.value = res.goods.data
              // console.log(res.goods.data);
          })
          //获取tabContral栏数据
          getHomeGoods('sales').then(res=>{
            goods.sales.list = res.goods.data
          })
          getHomeGoods('new').then(res=>{
            goods.new.list = res.goods.data
          })
          getHomeGoods('recommend').then(res=>{
            goods.recommend.list = res.goods.data
          })
    })
    const tabclick =(index)=>{
        
        let types = ['sales','new','recommend']
        currentType.value = types[index]
        nextTick(()=>{
        //判断挂载 挂载完成再执行
         bs && bs.refresh();
        })
    }
    //监听页面有刷新
    watchEffect(()=>{
      //等待dom渲染完成后开始监听使用nextTick
      nextTick(()=>{
        //判断挂载 挂载完成再执行
       bs && bs.refresh();
      })
    })
        return {
           imgUrl,
           recommends,
           tabclick, 
           goods,
           showlist,
           currentType,
          //  isTabFixed,
           tabHeight,
           showGoTop,
           GoToTop
         }
      }
});
</script>
<style scoped>
#home{
  position: relative;
  height: 100%;
}
.icon-fanhui {
  margin-left: 20px;
}
.banners {
    width: 100%;
}
.van-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width:100vw;
  height: 160px;
}
.van-swipe-item img{
    display: block;
    width:100vw;
    height: 160px;
    overflow: hidden;
}
.wrapper{
  position: absolute;
  top:49px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
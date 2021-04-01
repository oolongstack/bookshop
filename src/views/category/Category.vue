<template>
  <div id="category">
    <top-bar>
      <template v-slot:default>分类</template>
    </top-bar>
    <div class="mainbox">
      <div class="lefttab">
        <van-sidebar v-model="active">
         <van-collapse v-model="activeName" accordion>
         <van-collapse-item :title="item.name" :name="item.name"  v-for="item in categories" :key="item.id">
          <van-sidebar-item :title="sub.name" v-for='sub in item.children' :key="sub.id"
          @click="getGoods(sub.id)"
          />
          </van-collapse-item>
          </van-collapse>
        </van-sidebar>
      </div>
      <div class="checktab">
        <div class="ordertab">
          <van-tabs v-model="actives" @click="tabClick">
            <van-tab title="销量排序"></van-tab>
            <van-tab title="价格排序"></van-tab>
            <van-tab title="评论排序"></van-tab>
          </van-tabs>
        </div>
        <div class="goodslist">
            <div class="content">
               <van-card
               @click="itemClick(item.id)"
               v-for="item in showGoods" :key="item.id"
              :num="item.comments_count"
              :tag="item.comments_count >= 0? '爆款':'流行' "
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load='true'
            />
            
            </div>
        </div>
      </div>
    </div>
    <go-top v-show='showGoTop' @click="GoToTop"></go-top>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import {getCategory,getCategoryGoods} from 'network/category.js'
import GoTop from 'components/common/gotop/GoTop'
import Bscroll from 'better-scroll'
import { defineComponent ,ref, onMounted, reactive,computed ,watchEffect,nextTick} from "vue";
import {useRouter} from 'vue-router'
export default defineComponent({
  name: "Category",
  components: {
    TopBar,
    GoTop
  },
  setup() {
    const router = useRouter();
    let bs = reactive({})
    const active = ref(0);
    const activeName = ref('1')
    let showGoTop = ref(false)
    let actives = ref('1')
    let categories = ref([]);
    //当前的排序条件
    let currentOrder = ref('sales')
    //当前的分类ID
    let currentCid = ref(0)
    //分类数据模型
    const goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]}
    })
    //通过计算属性来决定要获取的数据
    const showGoods =computed(()=>{
      return goods[currentOrder.value].list
    })
    //自己定义一个方法用于网络请求
    const init =()=>{
      getCategoryGoods('sales',currentCid.value).then(res=>{
        goods.sales.list = res.goods.data
      })
       getCategoryGoods('price',currentCid.value).then(res=>{
        goods.price.list = res.goods.data
      })
       getCategoryGoods('comments_count',currentCid.value).then(res=>{
       goods.comments_count.list = res.goods.data
      })
    }
    //这个组件index参数是自带的 
    const tabClick =(index)=>{
      let orders = ['sales','price','comments_count']
      currentOrder.value = orders[index]
      //点击选项卡时也是根据选项卡获取数据
      getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
        goods[currentOrder.value].list = res.goods.data
         nextTick(()=>{
        //判断挂载 挂载完成再执行
        bs && bs.refresh();
         })
      })
      // console.log(currentOrder.value);
    }
    //通过分类得到商品
    const getGoods =(cid)=>{
      //点击后改变调用的id
      currentCid.value = cid;
      // console.log(currentCid.value);
      //点击时也调用
      init();
    }
    const GoToTop =()=>{
      bs.scrollTo(0,0,500)
    }
    onMounted(() => {
      //在叶面加载完成后调用此方法,页面默认显示sales内容，所以无需全部获取 其他的获取在点击后进行
        getCategoryGoods('sales',currentCid.value).then(res=>{
        goods.sales.list = res.goods.data
        })
        getCategory().then(res =>{
            categories.value = res.categories
        })
        //滚动插件
        bs = new Bscroll(document.querySelector('.goodslist'),{
        probeType:3,
        click:true,
        pullUpLoad:true
      })
      bs.on('scroll', (position)=>{
        showGoTop.value = -position.y > 800
      })
      bs.on('pullingUp',()=>{
        nextTick(()=>{
        //判断挂载 挂载完成再执行
         bs && bs.refresh();
          })
      //首先获取是在哪个类型里面上拉的
        const page = goods[currentOrder.value].page + 1 
        getCategoryGoods(currentOrder.value,currentCid.value,page).then(res=>{
            goods[currentOrder.value].list.push(...res.goods.data);
            goods[currentOrder.value].page +=1;
            bs.finishPullUp()
        })
            nextTick(()=>{
        //判断挂载 挂载完成再执行
       bs && bs.refresh();
      })
      })
    })
    watchEffect(()=>{
      //等待dom渲染完成后开始监听使用nextTick
      nextTick(()=>{
        //判断挂载 挂载完成再执行
       bs && bs.refresh();
      })
    })
    return { 
        active,
        categories,
        activeName ,
        actives,
        tabClick,
        currentOrder,
        getGoods,
        currentCid,
        goods,
        showGoods,
        bs,
        showGoTop,
        GoToTop,
        itemClick:(id)=>{
          router.push({
            path:'/detail',
            query:{id}
          })
        }
    };
  },
});
</script>
<style scoped lang='scss'>
#category{
  position: relative;
}
.mainbox {
  position: absolute;
  top: 49px;
  left: 0;right: 0;
  display: flex;
  .lefttab {
    width: 38%;
    height: 100%;
  }
  .van-sidebar{
      width: 100%;
  }
  .checktab {
    width: 62%;
    .ordertab {
      width: 100%;
      height: 40px;
    }
    .goodslist {
      overflow: hidden;
      height: calc(100vh - 139px);
      .van-card{
        padding: 10px;
      }
    }
  }
}
</style>
<template>
  <div id="profile">
    <top-bar>
      <template v-slot:default>个人中心</template>
    </top-bar>
    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img src="~assets/img/nike.png" alt="">
          <div class="user-desc">
            <span>昵称:{{user.name}}</span>
            <span>登录名:{{user.email}}</span>
            <span class="name">个性签名:茉莉蜜茶真好喝</span>
          </div>
        </div>
      </div>
      <ul class="user-list">
          <li class="van-hairline-bottom" @click="goto('/collect')">
              <span>我的收藏</span>
              <van-icon name='arrow'/>
          </li>
          <li class="van-hairline-bottom" @click="goto('/order')">
              <span>我的订单</span>
              <van-icon name='arrow'/>
          </li>
          <li class="van-hairline-bottom" @click="goto('/setting')">
              <span>账号管理</span>
              <van-icon name='arrow'/>
          </li>
          <li class="van-hairline-bottom" @click="goto('/address')">
              <span>地址管理</span>
              <van-icon name='arrow'/>
          </li>
          <li class="van-hairline-bottom" @click="goto('/about')">
              <span>关于我们</span>
              <van-icon name='arrow'/>
          </li>
      </ul>
    </div>
    <div style='margin:16px'>
      <van-button round block color="#44BA80" @click="goOut">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import { logout ,getUser } from "network/user";
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { defineComponent ,onMounted, reactive,toRefs} from "vue";
export default defineComponent({
  name: "Profile",
  components: {
    TopBar,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
        user:{}
    })
    onMounted(() => {
      getUser().then(res =>{
        console.log(res);
        state.user = res
      })
    })
    
    const goOut = () => {
      logout().then((res) => {
        console.log(res);
        if (res.status == 204){
          Toast.fail('再点一次退出登录')
        }
        if (res.status == 201){
          
            Toast.success('退出成功')
            //清除token
            window.localStorage.setItem('token','')
            //将登录状态变为false
            store.commit('setIsLogin', false)
            
            setTimeout(() =>{
                router.push({
                    path:'/login'
                })
            },500)
        }
      });
    };
    //跳转方法
    const goto=(path,query)=>{
      router.push({path:path,query:query || {}})  
    }
    return {
      goOut,
      ...toRefs(state),
      goto
    };
  },
});
</script>
<style lang='scss' scoped>
#profile{
  padding-top: 49px;
}
.user-box{
  .user-info{
    padding: 15px 10px;
    margin: 20px 10px;
    border-radius: 10px;
    background: linear-gradient(to right, #42bBaa,#9bdad1 );
    .info{
      display: flex;
      .user-desc{
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
.user-list{
  margin:10px 10px;
  .van-hairline-bottom{
    display: flex;
    justify-content:space-between;
    height:40px;
    line-height: 40px;
    margin-top:10px
  }
}
</style>
<template>
  <div id="app">
    <!-- //keepalive的路由组件 -->
   <!-- <router-view v-slot='{Component}'>
     <transition>
      <keep-alive>
      <component :is='Component'/>
      </keep-alive>
     </transition>
   </router-view> -->
   <router-view></router-view>

   <bottom-bar></bottom-bar>
  </div>  
</template>
<script>
import BottomBar from 'components/content/BottomBar.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { BottomBar}
})
</script>
<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont.css";
#app{
  height: 100vh;
}

</style>

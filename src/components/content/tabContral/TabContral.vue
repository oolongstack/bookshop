<template>
  <div class="tabcontral">
    <div class="tabcon-item" v-for="(item,index) in tabContral" :key="index" :class="{active:currentIndex == index}" @click="changeTab(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
import { defineComponent,ref } from "vue";
export default defineComponent({
  name: "TabContral",
  props: {
    tabContral: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props,{emit}){
      let currentIndex = ref(0)
      const changeTab =(index)=>{
          currentIndex.value = index
          emit('tabClick',index)
      }
      return{
          currentIndex,
          changeTab
      }
  }
});
</script>
<style scoped lang="scss">
.tabcontral {position: relative;
  top: 49px;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  z-index: 10;
  .tabcon-item {
    flex: 1;
  }
  .active {
      color: var(--color-high-text);
      
      span {
          border-bottom: 3px solid var(--color-high-text);
          padding-bottom: 5px;
      }
  }
}
</style>
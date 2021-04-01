<template>
<div class="address">
      <div class="address-box">
    <top-bar class="nav-bar">
      <template v-slot:default>地址管理</template>
    </top-bar>
    <div v-show="list.length == 0" class="dada">还没有地址信息,去添加吧!</div>
    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
    </div>
  </div>
</div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import { defineComponent, toRefs, reactive, onMounted } from "vue";
import { listAddress } from "network/address";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "Address",
  components: { TopBar },
  setup(props) {
      const router = useRouter();
      const route = useRoute();
      const state = reactive({
          chosenAddressId:'1',
          list: []
      })
      onMounted(() => {
          
      })
      const onAdd=()=>{
          router.push({path:'/addressedit',query:{type :'add'}})
      }
      const onEdit=()=>{
          router.push({path:'/addressedit',query:{type :'edit',addressId:item.id}})
      }
      const select=()=>{
          router.push({path:'/createorder',query:{addressId:item.id}})
      }
    return {
        ...toRefs(state),
        onAdd,
        onEdit,
        select
    };
  },
});
</script>
<style scoped lang="scss">
.address{
    position: relative;
    padding-top:49px;
    padding-bottom:50px
}
.address-box {
  height: 300px;
  .dada{
      margin-top: 200px;
      text-align: center;
  }
  .van-radio__icon{
      display: none;
  }
  .address-item {
      margin-top:45px;
      .van-button{
          background: var(--color-tint);
          border-color:var(--color-tint);
        .van-address-list{
            position: relative;
        } 
      }
    }
}

</style>
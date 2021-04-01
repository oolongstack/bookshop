<template>
  <div class="recommend">
    <div class="rec-item" v-for="item in recommends.slice(1,5)" :key="item.id">
      <a href="" @click.prevent="goDetails(item.id)">
        <img v-lazy="item.cover_url" alt="" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
import {useRouter} from 'vue-router'
import { defineComponent } from "vue";
export default defineComponent({
  name: "Recommend",
  props: {
    recommends: {
        type: Array,
        default(){
            return [];
        }
    },
  },
  setup(){
    const router = useRouter();
    const goDetails =(id)=>{
      router.push({
        path:'/detail',
        query:{id}
      })
    }
    return{
      goDetails
    }
  }
});
</script>
<style lang='scss' scoped>
.recommend {
  display: flex;
  font-size: 12px;
  border-bottom: 8px solid #f6f6f6
}
.rec-item {
  flex: 1;
  img {
    width: 100%;
  }
}
.rec-item img{
  margin-top: 5px;
  margin-bottom: 5px;
}
.rec-item div{
  margin-bottom: 15px;
}
</style>
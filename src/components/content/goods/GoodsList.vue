<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :key="item" :product='item'></goods-list-item>
    </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
import { defineComponent } from "vue";
export default defineComponent({
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
      goods: {
          type:Array,
          default(){
              return []
          }
      }
  }
});
</script>
<style scoped lang="scss">
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 3px;
}
</style>
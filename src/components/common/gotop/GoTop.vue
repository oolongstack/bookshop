<template>
    <div class="gotop"></div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name:'GoTop'
})
</script>
<style lang="scss" scoped>
    .gotop {
        position: fixed;
        bottom: 65px;
        right: 20px;
        width: 48px;
        height: 48px;
        background: url("~assets/img/up.png") no-repeat center center;
}       
</style>
<template>
    <div class="topbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name:'TopBar'
})
</script>
<style scoped>
.topbar{
    display: flex;
    position: fixed;
    top: 0;left: 0;right: 0;
    height: 49px;
    line-height:49px;
    color: #fff;
    background-color: var(--color-high-text);
    box-shadow: 0 2px 0 rgba(100, 100, 100, 0.1);
    z-index: 10;
}
.topbar .left{
    width: 25%;
}
.topbar .center{ 
    text-align: center;
    width: 50%;
}
.topbar .right{
    width: 25%;
}
</style>
<template>
    <div class="wrapper" >
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'
import { defineComponent ,onMounted,reactive, ref} from 'vue'
export default defineComponent({
    name:'Scroll',
    setup(props) {
        let bs = reactive({})
        onMounted(() => {
            bs = new Bscroll(document.querySelector('.wrapper'),{
                click:true,
                probeType:3,
            })
        })
        return{
           bs
        }
    }
})
</script>
<style scoped>

</style>
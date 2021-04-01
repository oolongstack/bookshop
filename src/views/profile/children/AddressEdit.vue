<template>
<div class="addressedit">  
    <top-bar class="nav-bar">
        <template v-slot:left
        ><i class="iconfont icon-fanhui" @click="goBack"></i
        ></template>
      <template v-slot:default>新增加地址</template>
    </top-bar>
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        />
  
</div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import {Toast} from 'vant'
import {addAddress,editAddress,deleteAddress,getAddressDetail} from 'network/address'
import {useRouter} from 'vue-router'
import { defineComponent ,ref,onMounted, reactive,toRefs} from 'vue'
export default defineComponent({
    name:'AddressEdit',
    components:{TopBar},
    setup() {
        const router = useRouter()
        const searchResult = ref([]);
        const state = reactive({
            areaList:{
                provice_list:{},
                city_list:{},
                contry_list:{}
            }
        });
        const onSave = () => Toast('save');
        const onDelete = () => Toast('delete');
        const onChangeDetail = (val) => {
        if (val) {
            searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
            ];
        } else {
            searchResult.value = [];
        }
        };
        const goBack=()=>{
            router.go(-1)
        }
        return {
        onSave,
        onDelete,
        ...toRefs(state),
        searchResult,
        onChangeDetail,
        goBack
        };
  },
})
</script>
<style scoped>
.addressedit{
    padding-top: 50px;
}
.icon-fanhui{
    margin-left:10px
}
</style>
import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


const state = {
  user: {
    //登录状态取决于token的存不存在 因为每次刷新都会重置store 而window.localStorage不会
     isLogin: window.localStorage.getItem('token') ? false : true
  },
  cartCount:0
}
export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})

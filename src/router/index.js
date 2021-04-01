import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import {Notify} from 'vant'
const Home =()=>import('views/home/Home')
const Detail =()=>import('views/detail/Detail')
const Category =()=>import('views/category/Category')
const Profile =()=>import('views/profile/Profile')
const Address =()=>import('views/profile/children/Address')
const AddressEdit =()=>import('views/profile/children/AddressEdit')
const Shopcart =()=>import('views/shopcart/Shopcart')
const Register =()=>import('views/profile/Register')
const Login =()=>import('views/profile/Login')

const routes = [
  
  {
   path:'',
   name:'DefaultHome',
   component: Home,
   meta:{
     title:'首页',
   }
  },
  {
    path:'/home',
    name:'Home',
    component: Home,
    meta:{
      title:'首页',
    }
   },
  {
    path:'/category',
    name:'Category',
    component: Category,
    meta:{
      title:'商品分类',
    }
   },
   {
    path:'/detail',
    name:'Detail',
    component: Detail,
    meta:{
      title:'商品详情',
    }
   },
   {
    path:'/shopcart',
    name:'Shopcart',
    component: Shopcart,
    meta:{
      title:'购物车',
      //是否需要授权的标识
      isAuthRequied:true
    }
   },
   {
    path:'/profile',
    name:'Profile',
    component: Profile,
    meta:{
      title:'个人中心',
      isAuthRequied:true
    }
   },
   {
    path:'/register',
    name:'register',
    component: Register,
    meta:{
      title:'用户注册',
    }
   },
   {
    path:'/login',
    name:'login',
    component: Login,
    meta:{
      title:'用户登录',
    }
   },
   {
    path:'/address',
    name:'address',
    component: Address,
    meta:{
      title:'地址管理',
      isAuthRequied:true
    }
   },
   {
    path:'/addressedit',
    name:'addressedit',
    component: AddressEdit,
    meta:{
      title:'地址编辑',
      isAuthRequied:true
    }
   },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isAuthRequied && store.state.user.isLogin === false){
    //return是为了不执行下面的代码 避免需要验证时放行
    Notify('请登录后访问')
    next('/login')
    return 
  }else{
    next()
  }
  document.title = to.meta.title
})
export default router

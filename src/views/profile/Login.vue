<template>
  <div class="registers">
    <top-bar>
      <template v-slot:default>用户登录</template>
    </top-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          :src="require('assets/img/nike.png')"
        />
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="email"
        name="电子邮件"
        label="电子邮件"
        placeholder="电子邮件"
        :rules="[{ required: true, message: '请填写电子邮件' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
          <div class='linklogin' @click="$router.push({path:'/register'})">
              没有账号 立即注册
          </div>
         <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import { Notify } from "vant";
import { Toast } from "vant";
import { login } from "network/user.js";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
export default defineComponent({
  name: "Login",
  components: {
    TopBar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userinfo = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
        login(userinfo).then(res=>{
            //将token保存到本地 window.localStorage setItem(key,value) getItem(key)
            window.localStorage.setItem('token',res.access_token);
            //在vuex中控制登录状态
            store.commit('setIsLogin',true)
            //弹出成功提示框
            Toast.success('登录成功')
            //重置
            userinfo.email = ''
            userinfo.password = ''
            //定时后跳转
            setTimeout(() =>{
                router.go(-1)
            },500)
        })
    };
    return {
      ...toRefs(userinfo),
      onSubmit
    };
  },
});
</script>
<style scoped>
.linklogin{
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
    color: #42b983
}
</style>
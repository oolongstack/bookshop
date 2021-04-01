<template>
  <div class="registers">
    <top-bar>
      <template v-slot:default>用户注册</template>
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
    <van-form @submit="tijiao">
      <van-field
        v-model="name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password_confirmation"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请再次填写密码' }]"
      />
      <van-field
        v-model="email"
        name="电子邮箱"
        label="电子邮箱"
        placeholder="电子邮箱"
        :rules="[{ required: true, message: '请填写电子邮箱' }]"
      />
      <div style="margin: 16px">
          <div class='linklogin' @click="$router.push({path:'/login'})">
              注册完成 立即登录
          </div>
         <van-button round block type="primary" native-type="submit" class="lalall">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import { Notify } from "vant";
import { Toast } from "vant";
import { register } from "network/user.js";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Register",
  components: {
    TopBar,
  },
  setup() {
    const router = useRouter();
    const userinfo = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const tijiao = (values) => {
      //   console.log('submit', values);

      //先验证
      let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (userinfo.password != userinfo.password_confirmation) {
        Notify({ type: "danger", message: "请输入相同密码" });
      } else if (userinfo.password.length < 6) {
        Notify({ type: "danger", message: "密码至少为6位" });
      } else if (!myreg.test(userinfo.email)) {
        Notify({ type: "danger", message: "请输入正确格式的邮箱" });
      } else {
        register(userinfo).then((res) => {
           console.log(res);
          //  console.log(values);
          if (res.status == 201) {
            Toast.success("注册成功");
            setTimeout(() => {
              router.push({
                  path: "/login"
              })
            },500);
          }
          (userinfo.password_confirmation = ""), (userinfo.password = "");
        });
      }
    };
    return {
      ...toRefs(userinfo),
      tijiao,
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
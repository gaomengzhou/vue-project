<template>
  <div>
    <div class="bgc-login">
      <Header title="我的"></Header>
      <div class="btn-center" v-if="show">
        <mt-button type="danger" class="login-btn" @click="goLogin">登录</mt-button>
        <mt-button type="primary" class="register-btn" @click="goRegister">注册</mt-button>
      </div>
      <div class="btn-center" v-else>
        <h3>欢迎你 ,  {{username}}  <mt-button size="small" type="primary" class="login-btn">我的收藏</mt-button></h3>
        <mt-button type="danger" class="login-btn" @click="zhuxiao">注销</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      show: localStorage.username === undefined ? true : false
    };
  },
  computed: {
    ...mapState(['username'])
  },
  methods: {
    zhuxiao() {
      localStorage.removeItem("username");
      localStorage.removeItem("nowUrl");
      window.location.reload();
    },
    goLogin() {
      this.$router.push({ name: "login" });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    }
  },
  components: {}
};
</script>

<style scoped>
.mint-button {
  width: 90%;
  margin-top: 0.5rem;
}
.register-btn {
  margin-bottom: 70%;
}
.btn-center {
  width: 90%;
  height: 100%;
  margin-left: 10%;
  margin-top: 100%;
}
.bgc-login {
  background: url("../assets/images/loginBgc.gif") no-repeat;
  background-size: 100% 100%;
}
</style>


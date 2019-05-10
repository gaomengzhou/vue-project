<template>
  <div class="bgc-login">
    <Header title="登入" :show="!!1"></Header>
    <div class="position-div">
      <div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
      <div class="subm-canse-btn">
        <mt-button type="danger" class="subm" @click="getLogin">登入</mt-button>
        <mt-button type="primary" class="canse" @click="cansel">取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { truncate } from "fs";
import {http} from '../utils';
import {mapState,mapActions} from 'vuex';
export default {
  data() {
    return {
 
    };
  },
  computed:{
    username:{
        get(){
          return this.$store.state.username
        },
        set(val){
          this.$store.commit('getUsername',val)
        }
    },
    password:{
      get(){
          return this.$store.state.password
        },
        set(val){
          this.$store.commit('getPassword',val)
        }
    },
    ...mapState(['loginResult'])
  },
  methods: {
    ...mapActions(['loginAjax']),
    getLogin(){
      this.loginAjax({url:'/vue/login',username:this.username,password:this.password,cb:()=>{}})
    },
    cansel() {
      this.$router.go(-1);
    }
  },
  mounted(){

  }
};
</script>
<style lang="scss" scoped>
.subm,
.canse {
  margin: 0.1rem;
}
.bgc-login {
  background: url("../assets/images/loginBgc.gif") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.subm-canse-btn {
  margin: 20% auto;
  width: 40%;
}
.position-div {
  width: 100%;
  position: absolute;
  left: 0;
  top: 30%;
}
</style>
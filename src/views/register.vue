<template>
  <div>
    <div>
      <mt-header title="注册">
        <div slot="left">
          <mt-button icon="back" @click="goback">返回</mt-button>
        </div>
      </mt-header>
    </div>
    <div>
      <mt-field label="用户名" @change="username" placeholder="请输入用户名" v-model="name"></mt-field>
      <mt-field label="密码" @change="pwd" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field
        label="确认密码"
        @change="dbpwd"
        placeholder="再次输入密码"
        type="password"
        v-model="dbpassword"
      ></mt-field>
      <mt-field label="手机号" @change="userTel" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    </div>
    <div class="subm-canse-btn">
      <mt-button type="danger" class="subm" @click="submit">注册</mt-button>
      <mt-button type="primary" class="canse" @click="cansel">取消</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { truncate } from "fs";
// import { setTimeout, clearTimeout } from "timers";
import { mapState, mapActions } from "vuex";
import { http } from "../utils";
export default {
  data() {
    return {
      name: "",
      password: "",
      dbpassword: "",
      phone: "",
      flag: false
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    username() {
      var regUserName = /^[a-zA-Z0-9_-]{3,16}$/;
      if (regUserName.test(this.name)) {
      } else {
        Toast("用户名只能3到16位（字母，数字，下划线，减号）");
      }
    },
    pwd(val) {
      var regPwd = /^[a-z0-9\.-_]{6,10}$/;
      if (regPwd.test(val)) {
      } else {
        Toast(
          "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
        );
      }
    },
    dbpwd(val) {
      if (this.password != val) {
        Toast("两次输入的密码不一致");
      } else {
      }
    },
    userTel(val) {
      var ragTel = /^1(3|4|5|7|8)\d{9}$/;
      if (!ragTel.test(val)) {
        Toast("输入常用的手机格式");
      } else {
      }
    },
    submit() {
      var regUserName = /^[a-zA-Z0-9_-]{3,16}$/;
      var regPwd = /^[a-z0-9\.-_]{6,10}$/;
      var ragTel = /^1(3|4|5|7|8)\d{9}$/;
      if (
        regUserName.test(this.name) &&
        regPwd.test(this.password) &&
        this.password == this.dbpassword &&
        ragTel.test(this.phone)
      ) {
        http
          .post("/vue/register", {
            username: this.name,
            password: this.password,
            phone: this.phone
          })
          .then(res => {
            console.log(res);
            if (res.data == "0") {
              Toast("注册成功 即将跳转登陆");
              var timer = setTimeout(() => {
                this.$router.push({ name: "login" }); //验证通过后进入数据库比较
                clearTimeout(timer);
              }, 2500);
            } else if (res.data == "1") {
              Toast("用户名已存在");
            } else if (res.data == "3") {
              Toast("服务器错误 稍后再试");
            }
          });
      } else {
        Toast("注册失败");
      }
    },
    cansel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.subm,
.canse {
  margin: 0.1rem;
}
.subm-canse-btn {
  margin: 20% auto;
  width: 40%;
}
</style>
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import {
  http
} from "./utils"
import {
  Toast
} from "mint-ui";

export default new Vuex.Store({
  state: {
    carNum: 7,
    goodList: [],
    swipeImgs: [],
    result: [],
    username: "",
    password: "",
    loginResult: [],

  },
  actions: {
    getSwipe({
      commit
    }, {
      url,
      limit,
      cb
    }) {
      http.get(url, {
        params: {
          limit
        }
      }).then(res => {
        console.log(res.data.result)
        commit("getSwipe", res.data.result)
        cb();
      })
    },
    getSearchAjax({
      commit
    }, {
      url,
      keyword,
      cb
    }) {
      http.get(url, {
        params: {
          keyword
        }
      }).then(res => {
        console.log(res);
        commit('getSearchAjax', res.data.result);
        cb();
      });
    },
    getGoodList({
      commit
    }, {
      url,
      cb
    }) {
      http.get(url, {}).then(res => {
        console.log(res);
        commit("getGoodList",
          res.data.result
        );
        cb();
      });
    },
    loginAjax({
      commit
    }, {
      url,
      cb
    }) {
      http.post(url, {
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        console.log(res.data);
        console.log(res.data.code);
        if (res.data.code == 200) {
          if (localStorage.nowUrl) {
            Toast("登入成功")
            localStorage.username = this.state.username;
            var timer = setTimeout(() => {
              // this.$router.push({ name: "home" })
              location.href = localStorage.nowUrl;
              clearTimeout(timer);
            }, 2000);
          } else {
            Toast("登入成功 即将跳转至首页")
            localStorage.username = this.state.username;
            var timer = setTimeout(() => {
              // this.$router.push({ name: "home" })
              location.href = "http://52.175.71.169:85/vue/#/app/home";
              clearTimeout(timer);
            }, 2000);
          }
        } else if (res.data.code == 500) {
          Toast("用户名或密码错误")
        }
        commit("loginAjax", res.data.result);
        cb();
      })
    },
    deleteGoods({
      commit
    }, {
      url,
      checkid,
      cb
    }) {
      http.get(url, {
        params: {
          checkid
        }
      }).then(res => {
        commit("deleteGoods", res.data.result);
        cb()
      })
    },
    updateCarNum({ commit }, { url, goodsid, goodsnum, cb }) {
      http.get(url, { params: { goodsid, goodsnum } }).then(res => {
        commit("updateCarNum", res.data.result)
        cb()
      })
    }
  },
  mutations: {
    updateCarNum(state, result) {

    },
    deleteGoods(state, result) {

    },
    getUsername(state, username) {
      state.username = username
    },
    getPassword(state, password) {
      state.password = password
    },
    getSearchAjax(state, result) {
      state.result = result
    },
    getGoodList(state, goodList) {
      state.goodList = goodList
    },
    getSwipe(state, img) {
      state.swipeImgs = img

    },
    loginAjax(state, result) {
      state.loginResult = result
    }
  },
})
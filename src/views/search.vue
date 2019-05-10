<template>
  <div>
    <Header class="header" title="搜索" :show="!!1"></Header>
    <div>
      <mt-search v-model.lazy="value">
        <ul>
          <li v-for="(item, index) in result" :key="index">
            <router-link :to="{name:'goods-detail',params:{goodsid:item._id}}">
              <img :src="item.img" alt>
              <p>{{item.title}}</p>
            </router-link>
          </li>
        </ul>
      </mt-search>
    </div>
  </div>
</template>

<script>
import { http } from "../utils";
import {mapState,mapActions} from "vuex";
export default {
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapState(["result"])
  },
  methods: {
    ...mapActions(["getSearchAjax"])
  },
  watch: {
    value(newVal) {
      console.log(newVal);
      this.getSearchAjax({ url: "/vue/search", keyword: newVal,cb:()=>{} });

      // http
      //   .get("/vue/search", {
      //     params: { keyword: newVal }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.result = res.data.result;
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding-top: 0.7rem;
  padding-bottom: 0.9rem;
}
ul,
ul li,
img {
  width: 100%;
}
li {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid rgb(195, 197, 197);
}

img {
  height: 4rem;
}
.header {
  position: relative;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>

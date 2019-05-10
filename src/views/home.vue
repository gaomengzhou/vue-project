
<template>
  <div>
    <Header title="首页"></Header>
    <Swipe :auto="2000"></Swipe>
    <ul>
      <li v-for="(item, index) in goodList" :key="index" style="animation : zoomInDown 1.5s">
        <router-link :to="{name:'goods-detail',params:{goodsid:item._id}}">
          <img :src="item.img" alt>
          <p class="p1">
            {{item.title}} --
            <span class="p2">类型:{{item.type.value}}</span>
          </p>

          <p class="p3">
            单价:{{item.price}} -- 销量:
            <span>{{item.xiaoliang}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { http } from "../utils";
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      goodList: [],
      show: false,
      selected: "suit"
    };
  },
  computed: {},
  methods: {},
  mounted() {
    http.get("/vue/getGoodList", {}).then(res => {
      console.log(res);
      this.$nextTick(() => {
        this.goodList = res.data.result;
      });
    });
  }
};
</script>



<style scoped>
u {
  padding-top: 0.2rem;
  padding-bottom: 0.9rem;
}
ul{
  width: 100%;
}
ul li {
  width: 50%;
  float: left;
}
img {
  height: 2rem;
  width: 100%;
}
ul li p {
  text-align: center;
  color: rgb(100, 99, 99);
}
ul li {
  padding: 10px;
  box-sizing: border-box;
  /* border-bottom: 2px solid rgb(195, 197, 197); */
}
</style>

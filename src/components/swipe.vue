<template>
  <div class="banner" style="animation : flip 1.5s">
    <mt-swipe :auto="auto">
      <mt-swipe-item v-for="(banner, index) in swipeImgs" :key="index">
        <img :src="banner.img" class="b-img">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Toast } from "mint-ui";
import { http } from "../utils";
export default {
  props: ["auto"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["swipeImgs"])
  },
  methods: {
    ...mapActions(["getSwipe"])
  },
  mounted() {
    this.getSwipe({
      url: "/vue/getGoodList",
      limit: 6,
      cb: () => {
        // Toast("加载成功!");
        // console.log(this.swipeImgs)
      }
    });

    // this.$http.get(this.url,{
    //     params:{
    //         limit:6
    //     }
    // }).then(res=>{
    //     console.log(res);
    //     this.banner = res.data.result;
    // })
  }
};
</script>


<style scoped>
.banner,
mt-swipe,
.b-img {
  height: 3rem;
  width: 100%;
}
</style>

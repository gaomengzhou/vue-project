<template>
  <div>
    <mt-swipe class="guide" :auto="0">
      <mt-swipe-item v-for="(img, i) in imgs" :key="i">
        <img @click="goToApp(i)" :src="img" class="g-img">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        require("../assets/images/slide1.png"),
        require("../assets/images/slide2.png"),
        require("../assets/images/slide3.png"),
        require("../assets/images/slide4.png")
      ]
    };
  },
  methods: {
    goToApp(id) {
      console.log(id)
      if (id == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    }
  },
  mounted() {
    console.log("xxxx")
    if (localStorage.count) {
      localStorage.count++;
      if (localStorage.count > 3) {
        this.$router.push({ name: "home" });
      }
    } else {
      localStorage.count = 1;
    }
  }
};
</script>


<style scoped>
.guide,
.g-img {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/foot";
export default {
  components: {
    Footer
  }
};
</script>


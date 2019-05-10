<template>
  <div>
    <mt-header :title="title">
      <div slot="left" v-if="show">
        <mt-button icon="back" @click="goback">返回</mt-button>
      </div>
      <mt-button icon="search" @click="goSearch" slot="right" v-if="!flag"></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  props: ["title", "show"],
  computed: {
    flag() {
      return localStorage.routeName === "search";
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>
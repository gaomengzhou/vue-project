<template>
  <div class="goods-div">
    <Header title="分类" :show="!!1"></Header>
    <div v-if="show" class="classify">
      <mt-navbar v-model="selected">
        <mt-tab-item :id="type.value" v-for="(type, index) in types" :key="index">{{type.text}}</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="type.value" v-for="(type, index) in types" :key="index">
          <GoodsList :type="type" :goodList="goodList"></GoodsList>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { Indicator} from "mint-ui";
import { http } from "../utils";
import {mapState,mapActions} from "vuex";
export default {
  components: {

  },
  data() {
    return {
      show: false,
      selected: 'suit',
    };
  },
  computed:{
    ...mapState(['goodList'])
  },
  methods:{
    ...mapActions(['getGoodList'])
  },
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    });
    this.getGoodList({url:"/vue/getGoodList",cb:()=>{

    }})
    // http.get("/vue/getGoodList", {}).then(res => {
    //   console.log(res);
    //   this.$nextTick(() => {
    //     this.goodList = res.data.result;
    //   });
    // });
    
    http.get("/vue/getGoodTypes", {}).then(res => {
      setTimeout(() => {
        this.types = res.data.result;
        this.show = true;
        Indicator.close();
      }, 500);
    });
  }
};
</script>

<style scoped>
.goods-div {
  display: flex;
  flex-direction: column;
  
  height: 100%;
}
.classify{
flex: 1;
}

</style>
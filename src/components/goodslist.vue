<template>
  <div>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul>
        <li v-for="(item, index) in goods" :key="index" style="animation : bounceInDown 1.5s">
          <router-link :to="{name:'goods-detail',params:{goodsid:item._id}}">
          <img :src="item.img">
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
    </mt-loadmore>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import {http} from '../utils'
export default {
  props: ["type", "goodList"],
  data() {
    return {
      goods: [],
      allLoaded: false
    };
  },
  computed: {
    // ...mapState(["type", "goodList"])
    // goods() {
    //   return this.goodList.filter((good, index) => {
    //     good.type.value == this.type.value;
    //   });
    // }
  },
  methods: {
    loadTop() {
      setTimeout(() => {
        this.allLoaded = true;
        this.$refs.loadmore.onTopLoaded();
      }, 1000);
    },
  
  },
  mounted() {
    this.goods = this.goodList.filter(
      good => good.type.value == this.type.value
    );
    console.log(this.goods);
  }
};
</script>

<style scoped>
u {
  padding-top: 0.2rem;
  padding-bottom: 0.9rem;
}
ul,
ul li,
img {
  width: 100%;
}
img {
  height: 4rem;
}
ul li p {
  text-align: center;
  color: rgb(100, 99, 99);
}
ul li {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid rgb(195, 197, 197);
}
</style>

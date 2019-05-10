<template>
  <div>
    <Header :title="goods.title" :show="!!1"></Header>
    <div class="divli">
      <img :src="goods.img" alt>
      <p class="p1">{{goods.title}}</p>
      <h4 class="position-h4r">
        <p class="p2">
          销量:
          <span>{{goods.xiaoliang}}</span>
        </p>
      </h4>
      <h4 class="position-h4l">
        <p class="p3">单价:{{goods.price}}</p>
      </h4>
    </div>
    <div class="buy-btn">
      <mt-button size="small" class="mtbutn" type="danger" @click="goToCar">加入购物车</mt-button>
      <mt-button size="small" class="mtbutn" type="danger" @click="goBuyNow">立即购买</mt-button>
      <mt-button size="small" class="mtbutn" type="primary" @click="chekName">收藏</mt-button>
    </div>
    <div class="detail">
      <ul>
        <li v-for="(good, index) in goods.imageUrls" :key="index">
          <img :src="goods.imageUrls[index]" :alt="good.title">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import { http } from "../utils";
import { mapState } from "vuex";
import { clearTimeout } from "timers";
export default {
  data() {
    return {
      goods: []
    };
  },
  computed: {
    ...mapState(["username"])
  },
  methods: {
    goToCar() {
      if (localStorage.username == this.username) {
        http
          .get("/vue/shopingcar", {
            params: {
              goodsid: this.goods.id,
              username: this.username,
              goodsnum: 1,
              price: this.goods.price,
              title: this.goods.title,
              img: this.goods.img,
            }
          })
          .then(res => {
            Toast("加入成功")
            console.log(this.goods);
          });
      } else {
        Toast("请先登入...即将自动跳转登入");
        localStorage.nowUrl = window.location.href;
        console.log(localStorage.nowUrl);
        var timer = setTimeout(() => {
          this.$router.push({ name: "mine" });
          clearTimeout(timer);
        }, 2000);
      }
    },
    goBuyNow() {
      if (localStorage.username == this.username) {
        http
          .get("/vue/shopingcar", {
            params: {
              goodsid: this.goods.id,
              username: this.username,
              goodsnum: 1,
              price: this.goods.price,
              title: this.goods.title,
              img: this.goods.img,
            }
          })
          .then(res => {
            console.log(this.goods);
          });
        this.$router.push({ name: "car" });
      } else {
        Toast("请先登入...即将自动跳转登入");
        localStorage.nowUrl = window.location.href;
        console.log(localStorage.nowUrl);
        var timer = setTimeout(() => {
          this.$router.push({ name: "mine" });
          clearTimeout(timer);
        }, 2000);
      }
    },
    chekName() {
      if (localStorage.username == this.username) {
        this.$router.push({ name: "car" });
      } else {
        Toast("请先登入...即将自动跳转登入");
        localStorage.nowUrl = window.location.href;
        console.log(localStorage.nowUrl);
        var timer = setTimeout(() => {
          this.$router.push({ name: "mine" });
          clearTimeout(timer);
        }, 2000);
      }
    }
  },
  mounted() {
    http
      .get("/vue/getGoodOne", {
        params: {
          _id: this.$route.params.goodsid
        }
      })
      .then(res => {
        this.goods = res.data.result;
      });
  }
};
</script>
<style lang="scss" scoped>
div {
  div {
    img {
      width: 100%;
      height: 4rem;
    }
  }
}

.divli {
  height: 5.5rem;
  position: relative;
  box-shadow: 1px 1px 20px 1px;
}

.p3 {
  float: left;
  color: red;
  font-weight: bold;
}

.p2 {
  float: right;
  color: rgb(124, 124, 121);
}

div.buy-btn {
  float: right;
}
.mtbutn {
  margin: 5px 5px 15px 5px;
}
.position-h4l {
  position: absolute;
  left: 0.3rem;
  bottom: 0.15rem;
}
.position-h4r {
  position: absolute;
  right: 0.3rem;
  bottom: 0.15rem;
}
</style>


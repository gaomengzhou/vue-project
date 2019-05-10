<template>
  <div>
    <Header title="购物车" :show="!!1"></Header>
    <div class="lb" v-for="(goods, index) in carList" :key="index">
      <div class="check">
        <input class="xz" type="checkbox" v-model="goods.checkOne">
      </div>
      <img :src="goods.img" class="spt">
      <div class="mid">
        <p class="name">{{goods.title}}</p>
        <div class="jj">
          <span class="jia" @click="reduce(goods.goodsid,goods.goodsnum<=1?1:--goods.goodsnum)">-</span>
          <input type="text" class="num" v-model="goods.goodsnum">
          <span class="jian" @click="add(goods.goodsid,++goods.goodsnum)">+</span>
        </div>
      </div>
      <div class="jgq">
        <div class="price">
          <p>
            ￥
            <span class="pri">{{goods.price*goods.goodsnum}}</span>
          </p>
        </div>
        <div class="price_de">
          <p>
            <del>￥{{(goods.price*1+99)*goods.goodsnum}}</del>
          </p>
        </div>
        <img src="../assets/images/del.jpg" class="del" @click="delGoods(goods._id,index)">
      </div>
    </div>
    <div class="fix_bottom">
      <input class="check-all" type="checkbox" v-model="checkAll">
      <span style="float:left;line-height:0.8rem;">全选</span>
      <div class="zjq">
        <p class="p1">
          合计:￥
          <span id="zj">{{total}}</span>
        </p>
        <p>含运费</p>
      </div>
      <a id="js" @click="goMoney">去结算</a>
    </div>
  </div>
</template>
<script>
import { http } from "../utils";
import { mapState, mapActions } from "vuex";
import { constants } from "crypto";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      carList: [],
      checkOne: false
    };
  },
  computed: {
    total: {
      get() {
        var total = 0;
        this.carList.forEach(item => {
          if (item.checkOne) {
            total += item.price * item.goodsnum;
          }
        });
        return total;
      },
      set() {}
    },
    checkAll: {
      get() {
        var flag = true;
        this.carList.forEach(item => {
          if (!item.checkOne) {
            flag = false;
          }
        });
        return flag;
      },
      set(val) {
        this.carList = this.carList.map(item => {
          item.checkOne = val;
          return item;
        });
      }
    },
    ...mapState([])
  },
  methods: {
    ...mapActions(["deleteGoods", "updateCarNum"]),
    goMoney() {
      this.carList.filter(item => {
        if (item.checkOne == true) {
          this.$router.push({ name: "give-money" });
        } else {
          Toast("至少选择一件商品去结算");
        }
      });
    },
    add(id, num) {
      this.updateCarNum({
        url: "/vue/updategoods",
        goodsid: id,
        goodsnum: num,
        cb: () => {}
      });
    },
    reduce(id, num) {
      this.updateCarNum({
        url: "/vue/updategoods",
        goodsid: id,
        goodsnum: num,
        cb: () => {}
      });
    },
    delGoods(id, index) {
      this.deleteGoods({
        url: "/vue/deletegoods",
        checkid: id,
        cb: () => {
          console.log(id);
        }
      });

      if (confirm("确认删除")) {
        this.carList.splice(index, 1);
      }
    }
  },
  mounted() {
    http
      .get("/vue/getshopingcarlist", {
        params: { username: localStorage.username }
      })
      .then(res => {
        this.carList = res.data.result;
        // console.log(this.carList);
      });
  }
};
</script>

<style scoped>
.lb {
  display: block;
  width: 100%;
  height: 2rem;
  margin-bottom: 0.3rem;
  border-bottom: 1px solid #ccc;
  background: #fafafa;
}
.lb .check {
  width: 0.7rem;
  height: 2rem;
  float: left;
  text-align: center;
  line-height: 2rem;
}
.lb .spt {
  display: block;
  width: 1.36rem;
  height: 1.4rem;
  float: left;
  margin-top: 0.26rem;
  background-color: aqua;
}
.lb .mid {
  width: 2.52rem;
  height: 1.7rem;
  float: left;
  margin-left: 0.18rem;
  margin-top: 0.16rem;
}
.lb .mid .name {
  font-size: 0.28rem;
  color: #333;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-top: 0.1rem;
  width: 3rem;
}
.lb .mid .color {
  font-size: 0.22rem;
  color: #8a8a8a;
  display: block;
  margin-top: 0.1rem;
}
.lb .mid .jj {
  width: 1.52rem;
  height: 0.4rem;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  margin-top: 0.1rem;
}
.lb .mid .jj .jian {
  display: block;
  font-size: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  width: 0.49rem;
  height: 0.38rem;
  float: left;
  box-sizing: border-box;
}
.lb .mid .jj .num {
  display: block;
  float: left;
  text-align: center;
  line-height: 0.4rem;
  width: 0.48rem;
  height: 0.35rem;
  font-size: 0.24rem;
  border-left: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  box-sizing: border-box;
  border: 0;
}
.lb .mid .jj .jia {
  display: block;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.4rem;
  width: 0.49rem;
  height: 0.38rem;
  float: left;
  box-sizing: border-box;
}
.lb .jgq {
  float: right;
  margin-right: 0.18rem;
  width: 1.44rem;
  height: 2rem;
  position: relative;
}
.lb .jgq .price {
  width: 100%;
  height: 0.34rem;
  font-size: 0.24rem;
  font-weight: bold;
  color: #e90327;
  display: block;
  float: right;
  margin-top: 0.26rem;
}
.lb .jgq .del {
  display: block;

  height: 0.46rem;
  float: right;
  margin-bottom: 0.4rem;
  position: absolute;
  bottom: -0.2rem;
  /* left: 0.8rem; */
  right: 0;
}
.fix_bottom {
  position: fixed;
  width: 100%;
  height: 0.8rem;
  background: #fafafa;
  bottom: 1rem;
  font-size: 0.24rem;
  color: #333;
}
.check-all {
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.8rem;
  margin-left: 0.2rem;
  display: block;
  background-image: url(../assets/images/check.jpg);
  background-size: 0.4rem 0.4rem;
  float: left;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
  line-height: 0.8rem;
}
.all {
  float: left;
  line-height: 0.8rem;
}
.fix_bottom .zjq {
  float: left;
  width: 1.96rem;
  height: 0.8rem;
  margin-left: 0.7rem;
}
.fix_bottom .zjq .p1 {
  font-size: 0.26rem;
  line-height: 0.4rem;
  font-weight: bold;
  color: red;
}
#js {
  display: block;
  width: 2.5rem;
  height: 0.8rem;
  background: #e90327;
  color: #fff;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  line-height: 0.8rem;
  float: right;
  text-decoration: none;
}
</style>



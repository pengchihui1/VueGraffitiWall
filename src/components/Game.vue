<!-- Base component of Discover Quickdraw page -->
<template>
  <div>
    <!-- 開始按鈕 -->
    <div
      v-show="!startShow"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      "
    >
      <button @click="startEvent()" style="font-size:30px" >
        開始塗鴉吧！
      </button>
    </div>
    <!-- 開始後的內容 -->
    <div v-show="startShow">
      <div class="container" v-if="!finishQuestion">
        <!-- 開始提示 -->
        <div v-show="!isShow" style="text-align: center">
          <p>塗鴉 {{ this.options.length }}/6</p>
          <p>畫出</p>
          <p>{{ option }}</p>
          <p>時間只有20秒</p>
          <button @click="showOthers()" style="font-size: 20px">知道了</button>
        </div>
        <!-- 遊戲 -->
        <div v-show="isShow" style="text-align: center">
          <p>請畫出：{{ option }}</p>
          <p v-if="seconds.toString().length > 1">
            倒計時：00:<span>{{ seconds }}</span>
          </p>
          <p v-else>
            倒計時：00:<span>0{{ seconds }}</span>
          </p>
          <div style="font-size: 20px; margin-bottom: 4px">
            <button style="margin-right: 10px" @click=" clear()">
              清除
            </button>
            <button
              style="margin-right: 10px"
              @click="nextQuestion()"
              v-show="options.length <= 5"
            >
              下一題
            </button> -->
             <button @click="clear()">退出</button>
          </div>
          <main class="main">
            <div class="main__content">
              <div class="main__canvas">
                <pc-drawing-pad v-model="drawing" ref="pad" style="border: 1px solid red" />
              </div>
            </div>
          </main>
          <p>可能是：{{ likey.length ? likey.join(",") : "" }}</p>
        </div>
      </div>
      <!-- 結束比對 -->
      <div
        v-else
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        "
      >
        <div>
          <ul id="example-1">
            <li v-for="(item, index) in options" :key="index">
              {{ item.name }}（{{ item.state ? "塗鴉正確" : "塗鴉不正確" }}）
            </li>
          </ul>
        </div>
        <button style="font-size: 30px">
          <a href="/">遊戲結束，返回首頁</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PcDrawingPad from "../common/drawing-pad.vue";
import axios from "axios";

import { throttle } from "lodash";

const guess = throttle(async (pad, drawing) => {
    // https://vue-graffiti-wall.vercel.app:4000/api/guess
    // http://localhost:4000/api/guess
    const result = await axios.post("http://localhost:4000/api/guess", {
    headers: {
        'Content-Type': 'application/json'
    },
    drawing,
    withCridential: true
  });
  pad.normalizedDrawing = result.data.normalizedDrawing;
  pad.word = result.data.word;
  pad.likey.push(result.data.word);
}, 1000);

export default {
  name: "GameModel",
  components: {
    PcDrawingPad
  },
  data() {
    return {
      startShow: false,
      isShow: false,
      optaionDate: [
          { englishName:'onion',chineseName:"洋蔥"},
          { englishName:'necklace',chineseName:"項鍊"},
          { englishName:'beard',chineseName:"鬍鬚"},
          { englishName:'angel',chineseName:"天使"},
          { englishName:'light bulb',chineseName:"燈泡"},
          { englishName:'mushroom',chineseName:"蘑菇"}
       ],
      options: [], //六個隨機題目
      option:"",//中文名称
      seconds: 20, //倒計時
      finishQuestion: false, //完成題目
      likey: [], // 疊加猜測結果
      drawing: [],
      normalizedDrawing: [[], []],
      word: "", //英文名称
    };
  },
  methods: {
    startEvent: function () {
      this.startShow = !this.startShow;
    },
    showOthers: function () {
      //顯示
      this.isShow = !this.isShow;
    },
    startTimer: function () {
      // 倒計時
      let counter = this.seconds;
      const interval = setInterval(() => {
        counter--;
        this.seconds = counter;
        if (counter <= 0) {
          clearInterval(interval);
          this.isShow = false;
          this.seconds = 20;
          // 判断猜测是否与题目相同，相同则正确
          if (this.word === this.likey[this.likey.length - 1]) {
            this.options = this.options.map((item) => {
              if (item.name === this.word) item.state = true;
            });
          }
          console.log(this.options)
          // 題目大於六個，已完成時
          if (this.options.length >= 6) {
            this.finishQuestion = true;
          } else {
            // 產生下一題
            this.randomQuestion();
          }
          this.clear();
        }
      }, 1000);
    },
    nextQuestion: function () {
      // 產生下一題
      this.randomQuestion();
      // 題目大於六個，已完成時
      if (this.options.length > 6) {
        this.finishQuestion = true;
      }
      this.isShow = false;
      this.seconds = 20;
      this.clear();
    },
    undo() {
      this.$refs.pad.undo();
    },
    clear() {
      this.$refs.pad.clear();
    },
    clearCanvas() {
      /**
       * 重置畫布
       */
      this.coords = [];
      this.likey = [];
    },
    randomQuestion: function () {    //隨機產生題目

      const option =this.randomOption()
      // 隨機產生的題目與
      const isBeing=this.options.filter(item=>item.name.includes(option)).length
      if (!isBeing) {
        this.options.push({ name: option, state: false });  // 題目不能重複進行創建
        this.option = option;
      } else {
        this.randomQuestion(); // 題目重複重新創建
      }
    },
    randomOption() {
      return this.optaionDate[Math.floor(Math.random() * this.optaionDate.length)].chineseName
    },
  },
  computed: {
    getClassNames: function () {
      return null
    },
  },
  watch: {
    // 監聽器
    isShow: function (val) {
      if (this.isShow) {
        this.startTimer();
      }
    },
    drawing(drawing) {
      // console.log(drawing);
      guess(this, drawing);
    },
  },
  beforeCreate() {
    // 创建之前无法获取响应数据
  },
  created() {
    //  產生第一個題目
    this.randomQuestion();
  },
  beforeMount() {
    // 挂载前
  },
  mounted() {
    // 挂载后
   
  },
  beforeUpdate() {
    // 数据更新之前
  },
  updated() {
    // 数据更新完成之后；
  },
  beforeDestroy() {
    // 销毁之前

  },
  destroyed() {
    // 销毁之后
  },
};
</script>

<style scoped>
.buttons {
  justify-content: flex-end;
}

.toggle {
  margin-left: 1.5em;
}
</style>

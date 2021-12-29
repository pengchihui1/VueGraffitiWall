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
      <!-- Loading screen -->
      <loading
        :active="!loadingModelOver"
        :can-cancel="false"
        :is-full-page="true"
        color="#428bca"
        v-if="!loadingModelOver"
      ></loading>
      <button @click="startEvent()" style="font-size: 30px" v-else>
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
            <button style="margin-right: 10px" @click="clearCanvas()">
              清除
            </button>
            <button
              style="margin-right: 10px"
              @click="nextQuestion()"
              v-show="options.length <= 5"
            >
              下一題
            </button>
            <!-- <button @click="clearCanvas()">退出</button> -->
          </div>
          <main class="main">
            <div class="main__content">
              <div class="main__canvas">
                <canvas
                  id="panel"
                  class="canvas"
                  width="600px"
                  height="600px"
                ></canvas>
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
import {
  BIG_CLASS_NAMES_CHINESS,
  SMALL_CLASS_NAMES_CHINESS,
} from "../utils/class_names";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
const SMALL_MODEL_URL = "./small_model/model.json";
const BIG_MODEL_URL = "./big_model/model.json";
import { TFModel, disposeTFVariables } from "../utils/model";

export default {
  name: "GameModel",
  components: {
    loading: Loading,
  },
  data() {
    return {
      startShow: false,
      isShow: false,
      options: [], //六個隨機題目
      option: "", //單前題目
      seconds: 20, //倒計時
      finishQuestion: false, //完成題目
      raw_predictions: [], // 存儲所有類別的原始預測概率
      mousePressed: false, // 將鼠標按下事件傳播到組件中
      coords: [], // 存儲繪製點的所有坐標
      brushWidth: 5, // 存儲畫筆寬度
      loadingModelOver: false, //負責加載屏幕可見性
      big_ranking: {}, // 存儲提交大模型的結果,
      likey: [], // 疊加猜測結果
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
          this.submitDrawing();
          this.isShow = false;
          this.seconds = 20;
          // 判断猜测是否与题目相同，相同则正确
          if (this.option === this.likey[this.likey.length - 1]) {
            this.options = this.options.map((item) => {
              if (item.name === this.option) item.state = true;
            });
          }
          // 題目大於六個，已完成時
          if (this.options.length >= 6) {
            this.finishQuestion = true;
          } else {
            // 產生下一題
            this.randomQuestion();
          }
          this.clearCanvas();
        }
      }, 1000);
    },
    verifyTimer: function (secondes) {
      const interval = setInterval(() => {
        secondes -= 1;
        this.submitDrawing(); //每兩秒猜測一次結果
        if (secondes <= 1) {
          clearInterval(interval);
        }
      }, 1000);
    },
    nextQuestion: function () {
      this.submitDrawing();
      this.isShow = false;
      this.seconds = 20;
      // 產生下一題
      this.randomQuestion();
      // 題目大於六個，已完成時
      if (this.options.length > 6) {
        this.finishQuestion = true;
      }
      this.clearCanvas();
    },
    randomQuestion: function () {
      //隨機產生題目
      let option =
        SMALL_CLASS_NAMES_CHINESS[
          Math.floor(Math.random() * SMALL_CLASS_NAMES_CHINESS.length)
        ].chineseName;
      // 隨機產生的題目與
      if (!this.options.filter(item => item.name === option).length) {
        // 題目不能重複進行創建
        this.options.push({ name: option, state: false });
        this.option = option;
      } else {
        // 題目重複重新創建
        this.randomQuestion();
      }
    },
    recordCoor(e) {
      /**
       * Record the x,y coordinates of mouse on canvas when mouse is pressed
       * 按下鼠標時記錄鼠標在畫布上的 x,y 坐標
       */
      var pointer = this.canvas.getPointer(event.e);
      var posX = pointer.x;
      var posY = pointer.y;

      if (posX >= 0 && posY >= 0 && this.mousePressed) {
        this.coords.push(pointer);
      }
    },
    getMinBox() {
      /**
       * Get top left and bottom right coords of bounding box of the drawing
       * 獲取圖形邊界框的左上角和右下角坐標
       */
      var coorX = this.coords.map(function (p) {
        return p.x;
      });
      var coorY = this.coords.map(function (p) {
        return p.y;
      });

      var min_coords = {
        x: Math.min.apply(null, coorX),
        y: Math.min.apply(null, coorY),
      };
      var max_coords = {
        x: Math.max.apply(null, coorX),
        y: Math.max.apply(null, coorY),
      };
      return {
        min: min_coords,
        max: max_coords,
      };
    },
    submitCanvas() {
      /**
       * Get image on canvas and submit it to the model for prediction
       * 在畫布上獲取圖像並將其提交給模型進行預測
       */
      let input_img = this.getImageData();
      this.raw_predictions = this.small_model.predictClass(input_img);
      // this.raw_predictions = this.big_model.predictClass(input_img);
    },
    submitDrawing() {
      /**
       * Add a point to the top class in predictions in result table for model
       * 在模型的結果表中的預測中添加一個點到頂級
       */
      const winClass = this.getTopClassNames()[0]
        ? this.getTopClassNames()[0].chineseName
        : "猜不到";
      this.big_ranking[winClass] = this.big_ranking[winClass];
      this.likey.push(winClass);
      console.log("猜測結果", this.getTopClassNames());
    },
    clearCanvas() {
      /**
       * Resets the canvas
       * 重置畫布
       */
      this.canvas.clear();
      this.canvas.backgroundColor = "#FFFFFF";
      this.raw_predictions = [];
      this.coords = [];
      this.likey = [];
    },
    getImageData() {
      /**
       * Get image data in canvas
       */
      const mbb = this.getMinBox();
      const dpi = window.devicePixelRatio; // 確定應添加多少額外的像素密度以使圖像更清晰 一般比例為1
      const imgData = this.canvas.contextContainer.getImageData(
        mbb.min.x * dpi,
        mbb.min.y * dpi,
        (mbb.max.x - mbb.min.x) * dpi,
        (mbb.max.y - mbb.min.y) * dpi
      );
      // console.log("邊框值", mbb, dpi);
      return imgData;
    },
    getTopClassNames: function () {
      /**
       * Find classes for highest predicted indices from findIndicesOfMax
       * 最高預測的類
       */
      var outp = [];
      let indices = this.findIndicesOfMax;

      for (var i = 0; i < indices.length; i++)
        outp[i] = this.getClassNames[indices[i]];
      return outp;
    },
  },
  computed: {
    //监听/依赖一个数据，并进行处理，異步處理
    findIndicesOfMax: function () {
      /**
       * Get indices of 5 classes with highest predicted probabilities
       */
      var outp = [];
      for (var i = 0; i < this.raw_predictions.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > 5) {
          let pred = this.raw_predictions;
          outp.sort(function (a, b) {
            return pred[b] - pred[a];
          }); // descending sort the output array
          outp.pop(); // remove the last index (index of smallest element in output array)
        }
      }
      return outp;
    },
    findTopValues: function () {
      /**
       * Find probs for highest predicted indices from findIndicesOfMax
       */
      var outp = [];
      let indices = this.findIndicesOfMax;
      // show 5 greatest scores
      for (var i = 0; i < indices.length; i++)
        outp[i] = this.raw_predictions[indices[i]];
      return outp;
    },
    getClassNames: function () {
      /**
       * Get all classes from models
       */
      return BIG_CLASS_NAMES_CHINESS;
      //  return BIG_CLASS_NAMES_CHINESS;
    },
  },
  watch: {
    // 監聽器
    isShow: function (val) {
      if (this.isShow) {
        this.startTimer();
        this.verifyTimer(this.seconds);
      }
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
    this.loadingModelOver = false;
    // 創建一個畫板
    let that = this;
    this.canvas = new fabric.Canvas("panel", {
      isDrawingMode: true, //鉛筆模式
    });
    this.canvas.backgroundColor = "#FFFFFF";
    this.canvas.freeDrawingBrush.width = that.brushWidth;
    this.canvas.renderAll();

    this.canvas.on("mouse:up", function (e) {
      that.submitCanvas();
      that.mousePressed = false;
    });
    this.canvas.on("mouse:down", function (e) {
      that.mousePressed = true;
    });
    this.canvas.on("mouse:move", function (e) {
      if (that.mousePressed) {
        that.recordCoor(e);
      }
    });

    this.small_model = new TFModel();
    this.big_model = new TFModel();

    Promise.all([
      this.small_model.loadModel(SMALL_MODEL_URL),
      this.big_model.loadModel(BIG_MODEL_URL),
    ]).then(() => {
      this.loadingModelOver = true;
    });
  },
  beforeUpdate() {
    // 数据更新之前
  },
  updated() {
    // 数据更新完成之后；
  },
  beforeDestroy() {
    // 销毁之前
    //  disposeTFVariables();
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

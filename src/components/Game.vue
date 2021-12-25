<!-- Base component of Discover Quickdraw page -->
<template>
  <div>

   <!-- 開始按鈕 -->
   <div v-show='!startShow' style=" display: flex;justify-content: center;align-items: center; height:100vh">
       <button  @click="startEvent()" style='font-size:30px;'>開始塗鴉遊戲</button>
  </div>
   <!-- 開始後的內容 -->
   <div v-show='startShow'>
        <div class="container" v-if='!finishQuestion'  >
          <!-- 開始提示 -->
          <div v-show="!isShow" style="text-align: center;">
            <p>塗鴉 {{options.indexOf(option)+1}}/6 </p>
            <p>畫出</p>
            <p>{{option}}</p>
            <p>時間只有20秒</p>
            <button @click="showOthers()" style="font-size: 20px;">我知道了</button>
          </div>
          <!-- Loading screen -->
          <!-- 遊戲 -->
          <div v-show="isShow" style="text-align: center;">
            <loading
            :active="!loadingModelOver"
            :can-cancel="false"
            :is-full-page="true"
            color="#428bca"
          ></loading>
            <p >請畫出：{{option}}</p>
            <p v-if='seconds.toString().length>1'>倒計時：00:<span>{{seconds}}</span></p>
            <p v-else>倒計時：00:<span>0{{seconds}}</span></p>
            <button style='font-size:20px; margin-bottom: 4px;' @click="clearCanvas()">清除</button>
            <main class="main">
              <div class="main__content">
                <div class="main__canvas">
                  <canvas id="panel" class="canvas" width="1000px" height="400px"></canvas>
                </div>
              </div>
            </main>
            <p>可能是：{{likey.length?likey.join(','):''}}</p>
          </div>
        </div>
        <!-- 結束比對 -->
        <div v-else style='display: flex;justify-content: center;align-items: center; height:100vh'> 
          <button style='font-size:30px;'><a href="/">遊戲結束，返回首頁</a></button>
          <!-- <p>我們的神經網絡視圖識別你畫的塗鴉內容，但全部猜錯了。你可以選擇其中一個塗鴉，看看神經網絡竟識別出什麼。</p> -->
          <!-- <div><button><a href="/">再玩一次</a></button><button><a href="/">返回首頁</a></button></div> -->
        </div>
  </div>
</div>
</template>

<script>
import { BIG_CLASS_NAMES_CHINESS ,BIG_CLASS_NAMES} from "../utils/class_names";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const BIG_MODEL_URL = "./big_model/model.json";
import { TFModel, disposeTFVariables } from "../utils/model";

export default {
  name: "GameModel",
  components: {
    loading:Loading
  },
  data() {
    return {
      startShow:false,
      isShow:false,
      options:[],//六個隨機題目
      option:'',//單前題目
      seconds:20,//倒計時
      finishQuestion:false,
      raw_predictions: [], // 存儲所有類別的原始預測概率
      mousePressed: false, // 將鼠標按下事件傳播到組件中
      coords: [], // 存儲繪製點的所有坐標
      brushWidth: 5, // 存儲畫筆寬度
      loadingModelOver: false, //負責加載屏幕可見性
      big_ranking: {}, // 存儲提交大模型的結果,
      likey:[] // 疊加猜測結果
    }
  },
  methods: {
    startEvent:function(){
      this.startShow = !this.startShow
    },
    showOthers: function() {//顯示
      this.isShow = !this.isShow
    },
    startTimer:function () { // 倒計時
        let counter=this.seconds
        const interval = setInterval(() => {
          counter--;
          this.seconds=counter
          if (counter <= 0 ) {
            clearInterval(interval);
            this.submitDrawing()
            this.isShow=false
            this.seconds=20
            // 產生下一題
            this.randomQuestion()
            // 清除猜測結果
            this.likey=[]
            // 題目大於六個，已完成時
            if(this.options.length>6){
                this.finishQuestion=true
            }
          }
        }, 1000);
    },
    verifyTimer:function(secondes){
        const interval = setInterval(() => {
          secondes-=1;
          this.submitDrawing();//每兩秒猜測一次結果
          if (secondes <= 0 ) {
            clearInterval(interval);
          }
        }, 1000);
    },
    randomQuestion:function(){
      const option=BIG_CLASS_NAMES_CHINESS[Math.floor(Math.random()*BIG_CLASS_NAMES_CHINESS.length)]
      this.options.push(option)
      this.option=option
    },
    recordCoor(e) {
      /**
       * Record the x,y coordinates of mouse on canvas when mouse is pressed
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
       */
      let input_img = this.getImageData();
      this.raw_predictions = this.big_model.predictClass(input_img);
    },
    submitDrawing() {
      /**
       * Add a point to the top class in predictions in result table for model
       */
      const winClass = this.getTopClassNames()[0];
      this.big_ranking[winClass] = this.big_ranking[winClass];
      this.likey.push(winClass)
     },
    clearCanvas() {
      /**
       * Resets the canvas
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
      const dpi = window.devicePixelRatio;

      const imgData = this.canvas.contextContainer.getImageData(
        mbb.min.x * dpi,
        mbb.min.y * dpi,
        (mbb.max.x - mbb.min.x) * dpi,
        (mbb.max.y - mbb.min.y) * dpi
      );
      return imgData;
    },
    getTopClassNames: function () {
      /**
       * Find classes for highest predicted indices from findIndicesOfMax //最高預測的類
       */
      var outp = [];
      let indices = this.findIndicesOfMax;
     
      for (var i = 0; i < indices.length; i++)
        outp[i] = this.getClassNames[indices[i]];
      return outp;
    },
  },
  computed:{
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
    },
  },
  watch:{
      // 監聽器
      isShow: function (val) { 
        if(this.isShow){
          this.startTimer()
          this.verifyTimer(this.seconds)
        }
      },
  },
  beforeCreate(){
      // 创建之前无法获取响应数据
  },
  created(){
      //  產生第一個題目
      this.randomQuestion()
  },
  beforeMount(){
      // 挂载前
    
  },
  mounted(){
    // 挂载后
    this.loadingModelOver = false;
    // 創建一個畫板
    let that = this;
    this.canvas = new fabric.Canvas("panel", {
      isDrawingMode: true,//鉛筆模式
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
      if(that.mousePressed){
          that.recordCoor(e);
      }
    });

    this.big_model = new TFModel();

    Promise.all([
      this.big_model.loadModel(BIG_MODEL_URL),
    ]).then(() => {
      this.loadingModelOver = true;
      console.log(this.loadingModelOver )
    });
  },
  beforeUpdate(){
      // 数据更新之前
  },
  updated(){
      // 数据更新完成之后；
  },
  beforeDestroy(){
      // 销毁之前
      //  disposeTFVariables();
  },
  destroyed(){
      // 销毁之后
  }
}
</script>

<style scoped>
.buttons {
  justify-content: flex-end;
}

.toggle {
  margin-left: 1.5em;
}
</style>

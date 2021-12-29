<template>
  <div class="pc-start">
    <div class="pc-brand">
      <span class="pc-brand__text">{{ title }}</span>
    </div>
    <pc-drawing-pad v-model="drawing" ref="pad" style="border: 1px solid red" />
    <pc-button label="undo" @click="undo()">測試</pc-button>
    <pc-button label="clear" @click="clear()"> 清除</pc-button>
    <div style="display: flex; flex-direction: row; transform: scale(0.5)">
      <pc-drawing-pad
        v-model="normalizedDrawing"
        :height="400"
        :width="400"
        :read-only="true"
      />
      <pc-drawing-pad
        v-model="normalizedDrawing"
        :height="255"
        :width="255"
        :read-only="true"
      />
      <pc-drawing-pad
        v-model="normalizedDrawing"
        :height="255"
        :width="255"
        :read-only="true"
      />
      <pc-drawing-pad
        v-model="normalizedDrawing"
        :height="255"
        :width="255"
        :read-only="true"
      />
      <pc-drawing-pad
        v-model="normalizedDrawing"
        :height="255"
        :width="255"
        :read-only="true"
      />
    </div>
    <h1>guess: {{ word }}</h1>
    <pc-button icon="right" label="Start" @click="start()" />
  </div>
</template>

<script>
/* eslint-disable */
import PcButton from "../common/button.vue";
import PcDrawingPad from "../common/drawing-pad.vue";
import axios from "axios";
import qs from 'qs'

import { throttle } from "lodash";

const guess = throttle(async (pad, drawing) => {
  //  https://vue-graffiti-wall.vercel.app:4000/api/guess
  //  http://localhost:4000/api/guess
  const result = await axios.post("http://localhost:4000/api/guess", {
    drawing,
  });
  pad.normalizedDrawing = result.data.normalizedDrawing;
  pad.word = result.data.word;
}, 100);

export default {
  components: {
    PcButton,
    PcDrawingPad,
  },

  data() {
    return {
      title: "Pictionary",
      drawing: [],
      normalizedDrawing: [[], []],
      word: "",
    };
  },

  watch: {
    drawing(drawing) {
      console.log(drawing);
      guess(this, drawing);
    },
  },

  methods: {
    undo() {
      this.$refs.pad.undo();
    },

    clear() {
      this.$refs.pad.clear();
    },
  },
};
</script>

<style>
.pc-start {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.pc-brand {
  align-items: center;
  display: flex;
  margin: 50px auto;
}
</style>

<template>
  <div :style="{ width: width, height: height }" class="drawing-pad" />
</template>

<script>
/* eslint-disable */

import { zip } from "lodash";

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },

    readOnly: {
      type: Boolean,
      required: false,
      default: false,
    },

    height: {
      type: Number,
      required: false,
      default: 500,
    },

    width: {
      type: Number,
      required: false,
      default: 500,
    },
  },

  watch: {
    value(value) {
      if (!this.readOnly) {
        return;
      }
      this.redraw();
    },
  },

  mounted() {
    const Sketch = require("sketch-js"); // eslint-disable-line
    const pad = this;

    this.sketch = Sketch.create({
      container: this.$el,
      fullscreen: false,
      width: this.width,
      height: this.height,
      autoclear: false,
      touchmove() {
        if (!pad.readOnly && this.dragging) {
          const touch = this.touches[0];
          this.lineWidth = 3;
          this.beginPath();
          this.moveTo(touch.ox, touch.oy);
          this.lineTo(touch.x, touch.y);
          this.stroke();

          pad.value[pad.value.length - 1][0].push(touch.x);
          pad.value[pad.value.length - 1][1].push(touch.y);

          pad.$emit("input", pad.value);
        }
      },
      touchstart() {
        if (!pad.readOnly && this.dragging) {
          pad.value.push([[], []]);
        }
      },
    });
  },

  methods: {
    undo() {
      this.value.pop();
      this.redraw();
    },

    redraw() {
      this.sketch.clear();
      this.value.forEach((touch, index) => {
        const strokes = zip(touch[0], touch[1]);

        strokes.forEach((stroke, index) => {
          if (index === 0) return;

          const prevStroke = strokes[index - 1];

          this.sketch.lineWidth = 3;
          this.sketch.beginPath();
          this.sketch.moveTo(prevStroke[0], prevStroke[1]);
          this.sketch.lineTo(stroke[0], stroke[1]);
          this.sketch.stroke();
        });
      });
    },

    clear() {
      //this.value = [];

      this.value.splice(0, this.value.length);
      this.redraw();
    },
  },
};
</script>

<style>
.drawing-pad {
  background: white;
  margin: 50px;
}
</style>

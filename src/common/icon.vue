<template>
  <i :class="classes">
    <slot />
  </i>
</template>

<script>
export default {
  name: "PcIcon",

  props: {
    icon: {
      type: String,
      default: "",
    },
  },

  computed: {
    classes() {
      return ["pc-icon", { [`pc-icon-${this.icon}`]: this.icon }];
    },
  },
};
</script>

<style>
.pc-icon {
  cursor: inherit;
  display: inline-block;
  font-size: 16px;
  user-select: none;
  vertical-align: middle;
}
</style>

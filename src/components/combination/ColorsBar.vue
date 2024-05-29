<template>
  <div class="flex">
    <div v-for="(item, index) in data" class="flex-1" :key="index">
      <ColorItem :data="item" :canCopy="canCopy" :itemHeight="itemHeight" />

      <slot name="itemFooter" v-bind="{ item, index }" />
    </div>
  </div>
</template>

<script>
import ColorItem from "@/components/combination/ColorItem";

export default {
  name: "ColorsBar",

  components: {
    ColorItem,
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    itemHeight: {
      type: Number,
      default: () => 200,
    },

    canCopy: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
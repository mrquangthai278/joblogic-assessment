<template>
  <div
    class="relative group border border-gray-300"
    @click="$emit('click', data)"
  >
    <ColorsBar :data="data?.colors ?? []" :itemHeight="100" />

    <div
      class="group-hover:block hidden absolute w-full bottom-0 left-0 h-1/2 bg-white text-black"
    >
      <div class="flex justify-between items-center p-4">
        <div class="flex-1">
          <p class="text-left">{{ data?.name }}</p>
        </div>
        <div class="flex gap-1">
          <span>❤</span>
          <span>{{ data?.likes ?? 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorsBar from "@/components/combination/ColorsBar.vue";

export default {
  name: "RelatedCombination",

  components: {
    ColorsBar,
  },

  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
};
</script>
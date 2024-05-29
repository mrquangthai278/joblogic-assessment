<template>
  <div class="relative">
    <!-- <p class="text-white z-20 relative">{{ currentTemplateInfo }}</p> -->

    <div class="absolute w-full top-0 left-0 h-[350px]">
      <img
        class="w-full h-full object-bottom"
        src="@/assets/images/asset/foreground.png"
        :style="getBackgroundStyles"
      />
    </div>

    <div class="relative z-10 container m-auto">
      <div
        class="pt-5 h-[calc(350px-200px)] flex flex-col items-center"
        :class="getTitleClasses"
      >
        <Breadcrumb :data="getBreadcrumbData" />
        <h1 class="mt-2 text-4xl font-bold">
          {{ getCurrentTemplateDetail?.name }}
          <br />
          color combination
        </h1>
      </div>

      <TemplateCard
        :data="getCurrentTemplateDetail"
        @changeColor="handleChangeColorItem"
      />

      <div class="mt-8">
        <h1 class="text-black text-4xl font-bold">Related Combinations</h1>

        <div class="grid grid-cols-2 gap-8 mt-4">
          <div v-for="item in getCurrentTemplateListRelated" :key="item.slug">
            <RelatedCombination
              class="cursor-pointer"
              :data="item"
              @click="handleClickTemplateRelatedItem"
            />
          </div>

          <div class="bg-gray-300 flex items-center justify-center h-[100px]">
            <p>See more combinations</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import set from "lodash/set";

import Breadcrumb from "@/components/common/Breadcrumb";
import TemplateCard from "@/components/card/TemplateCard";
import RelatedCombination from "@/components/combination/RelatedCombination";

import listCombinations from "@/assets/jsons/combinations/combinations.json";

import { mixColors, isBlackOrWhite } from "@/ultils/color";

export default {
  name: "TemplateView",

  components: {
    Breadcrumb,
    TemplateCard,
    RelatedCombination,
  },

  props: {
    slug: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      currentTemplateInfo: null,
    };
  },

  computed: {
    getMainColorTheme() {
      const defaultColor = "#f9ccd3";

      if (!this.getCurrentTemplateDetail) return defaultColor;

      const [color1, color2, color3, color4] =
        this.getCurrentTemplateDetail?.colors?.map((item) => item.hex);

      return mixColors(color1, color2, color3, color4);
    },

    getTitleClasses() {
      return isBlackOrWhite(this.getMainColorTheme) === "black"
        ? "text-white"
        : "text-black";
    },

    getBackgroundStyles() {
      return {
        backgroundColor: this.getMainColorTheme,
      };
    },

    getCurrentTemplateDetail() {
      return this.currentTemplateInfo?.combination ?? null;
    },
    getCurrentTemplateListRelated() {
      return this.currentTemplateInfo?.relatedCombinations ?? [];
    },

    getBreadcrumbData() {
      return [
        { label: "Colors", to: "/" },
        { label: "Colors Palettes", to: "/" },
        { label: this.getCurrentTemplateDetail?.name },
      ];
    },
  },

  methods: {
    fetchCurrentTemplateInfo(slug) {
      const { combinations = [] } = listCombinations;

      try {
        const foundTemplate = combinations.find(
          (item) => slug === item?.combination?.slug
        );

        if (!foundTemplate || !this.slug)
          throw new Error("Not found combination");

        this.currentTemplateInfo = foundTemplate;
      } catch (e) {
        // console.error(e);
        console.log("Getting default combination");
        this.currentTemplateInfo = combinations[0];
      }

      console.log("this", this.currentTemplateInfo);
    },

    handleClickTemplateRelatedItem(item) {
      this.$router.push({
        name: "template",
        params: {
          slug: item.slug,
        },
      });
      console.log("🚀 ~ handleClickTemplateRelatedItem ~ item:", item);
    },

    handleChangeColorItem({ value, index }) {
      set(this.currentTemplateInfo, `combination.colors[${index}].hex`, value);
    },
  },

  created() {
    this.fetchCurrentTemplateInfo(this.slug);
  },

  watch: {
    "$route.params.slug": {
      handler(newVal) {
        this.fetchCurrentTemplateInfo(newVal);
      },
    },
  },
};
</script>

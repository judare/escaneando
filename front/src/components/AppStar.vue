<template>

<div>
  <label class="labelModal">{{label}}</label>
  <div>
    <img v-for="star in starsArr"  src="/icons/star.svg" class="star" :class="{ 'star-active': modelValue >= star, clickable, [size]: true }" @click="clickStar(star)" :key="star">
  </div>
</div>
</template>
<script>
export default {
  name: "app-star",
  emits: ['update:modelValue'],
  props: {
    stars: { required: false, default: 5, type: Number },
    label: { required: true, default: null, type: String },
    modelValue: { required: false },
    clickable: { required: false, default: true, type: Boolean },
    size: { required: false, default: "md", type: String },
  },
  methods: {
    clickStar(value) {
      if (!this.clickable)  return;
      this.$emit('update:modelValue', value);
    }
  },
  computed: {
    starsArr() {
      let arr = [];
      for (let i = 0; i < this.stars; i++) {
        arr.push(i+1);
      }
      return arr;
    }
  }
  
}
</script>

<style lang="scss">
.star {
  filter: grayscale(1);
  display: inline-block;
  margin: 0 3px;
  &.clickable {
    cursor: pointer;
  }
  &.sm {
    width: 15px;
    height: 15px;
    margin: 0 1px;
  }
  &.star-active {
  filter: grayscale(0);
  }
}
</style>
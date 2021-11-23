<template>

  <button
    class="w-100"
    :class="{
      'bg-primary text-black rounded-full focus:outline-none focus:shadow-outline font-light  mb-3 hover:bg-black': variant == 'primary',
      'border-2 text-black rounded-full focus:outline-none focus:shadow-outline font-light border-black mb-3 ': variant == 'secondary',
      [sizeValue]: true
    }"
    type="button"
  >
    <slot></slot>
  </button>

</template>
<script>
export default {
  name: "app-button",
  props: [ "variant", "size" ],
  data() {
    return {
      id: ""
    }
  },
  mounted() {
    this.id = "e" + Date.now().toString().substr(-7);
  },
  computed: {
    sizeValue() {
      switch(this.size) {
        case "sm": 
          return "py-1 px-2";
        default:
          return "py-2 px-4";
      }
    }
    
  }
}
</script>
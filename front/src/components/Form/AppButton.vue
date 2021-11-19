<template>

  <button
    class="w-100"
    :class="{
      'bg-primary text-black py-2 px-4 rounded-full focus:outline-none focus:shadow-outline font-light  mb-3 hover:bg-black': variant == 'primary',
      'border-2 text-black py-2 px-4 rounded-full focus:outline-none focus:shadow-outline font-light border-black mb-3 ': variant == 'secondary'
    }"
    type="button"
  >
    <slot></slot>
  </button>

</template>
<script>
export default {
  name: "app-button",
  props: [ "variant" ],
  data() {
    return {
      id: ""
    }
  },
  mounted() {
    this.id = "e" + Date.now().toString().substr(-7);
  }
}
</script>
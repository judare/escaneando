<template>

<button class="bg-primary text-black py-2 px-4 rounded-full focus:outline-none focus:shadow-outline font-light w-100 mb-3 hover:bg-black" type="button">
                <slot></slot>
              </button>
</template>
<script>
export default {
  name: "app-button",
  props: [ ],
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
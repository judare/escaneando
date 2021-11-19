<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "default-layout"
}
</script>
<style lang="scss">
// @import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");
.bg-primary {
  background-image:linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%);
}
</style>
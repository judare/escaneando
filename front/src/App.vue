<template>
<div>
  <div class="">
    <component :is="layout">
      <router-view/>
    </component>

  </div>
</div>
</template>

<script>
import CustomerLayout from "@/layouts/Customer.vue";
import DefaultLayout from "@/layouts/Default.vue";

export default {
  components: {
    CustomerLayout,
    DefaultLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;700&display=swap');


* {
  font-family: 'Poppins', sans-serif;
}
html {
  scroll-behavior: smooth;
}
html, body {
  overflow-x: hidden;
}
body {
  background: #fff;
}
body, html, h1,h2,h3,h4,h5,h6 {
  margin: 0;
  padding: 0;
}
ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
a {
  text-decoration: none;
  color: #444;
}

.w-100 {
  width: 100%;
}
.mb-5 {
  margin-bottom: 30px;
}
.v-align {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}
 .btn {
    box-sizing: border-box;
    padding: 10px;
    border: none;
    transition: .3s;
    color: white;
    border-radius: .7rem;
    cursor: pointer;

    &.btn-primary {
      background: linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1);
      font-size: 16px;
    }
    &.btn-action {
      background: #000;
      font-size: 16px;
      border-radius: 100rem;
      text-align: center;
      padding: 10px 20px;
    }
    &:disabled {
      background: #ddd;
    }
  }
.container {
  padding: 0 20px;
  margin: 0 auto;
}
</style>

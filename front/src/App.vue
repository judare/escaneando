<template>

<div class="page" :class="config.darkMode ? 'dark-mode' : ''">

  <div class="toggles dark-mode-button">
    <div class="options" :class="{ active: !config.darkMode }" @click="toggleDarkMode">
      <div class="toggle-option left sun"/>
      <div class="toggle-option right night"/>
    </div>
  </div>

  <router-view/>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["config"])
  },
  methods: {
    toggleDarkMode() {
      this.config.darkMode = !this.config.darkMode;
    }
  },
  watch: {
    config: {
      deep: true,
      handler(a) {
        window.localStorage.setItem("config", JSON.stringify(a))
      }
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;500;700&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
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

.header {
  .logo {
    img {
      max-height: 100px;
      max-width: 200px;
    }
  }
}
.page {
  min-height: 100vh;
  &.dark-mode {
    background: #1b1c21;
    color: #838386;
    .box, .product-box.card {
      background: #25262b;
    }
  }
  .dark-mode-button {
    position: absolute;
    top: 50px;
    right: 50px;
  }
}
.list-options {
  li {
    display: inline-block;
    margin: 10px;
  }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}
.box {
  box-shadow: 0 5px 8px 10px rgb(0 0 0 / 5%);
  width: 150px;
  padding: 20px;
  border-radius: .7rem;
  display: inline-block;
}

.box-check {
  .box {
    cursor: pointer;
  }
  input {
    display: none;
  }
  input:checked ~ .box {
    background: linear-gradient(45deg, #ff9800, #ff5722);
    color: white;
  }
}
.toggles {
  border-radius: 100rem 100rem 100rem 100rem;
  width: 100px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  .options {
    position: absolute; 
    right: 0px;
    width: 200px;
    transition: .3s;

    &.active {
      right: -100px;
    }
    .toggle-option {
      width: 100px;
      height: 40px;
      display: inline-block;
      background-position: center;
      background-size: 32px;
      background-repeat: no-repeat;
      &.right {
        border-radius: 0 1rem 1rem 0;
      }
      &.left {
        border-radius: 1rem 0rem 0rem 1rem;
      }
      &.sun {
        background-color: #fdd439;
        background-image: url(/icons/sun.png);
      }
      &.night {
        background-color: #393991;
        background-image: url(/icons/night.png);
      }
    }
  }
}
</style>

<template>

<div class="page" :class="config.darkMode ? 'dark-mode' : ''">

  <div class="page-mobile">
    <div class="toggles dark-mode-button">
      <div class="options" :class="{ active: !config.darkMode }" @click="toggleDarkMode">
        <div class="toggle-option left sun"/>
        <div class="toggle-option right night"/>
      </div>
    </div>

    <button @click="toggleStyle" class="btn-style" type="button" v-if="$route.name == 'menu'">
      <img :src="`/icons/${config.style}.png`">
    </button>


    <router-view/>

    <app-footer/>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFooter from "@/components/AppFooter.vue"

export default {
  computed: {
    ...mapGetters(["config"])
  },
  methods: {
    toggleDarkMode() {
      this.config.darkMode = !this.config.darkMode;
    },
    toggleStyle() {
      this.config.style = this.config.style == "list" ? "card" : "list";
    }
  },
  components: {
    AppFooter
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
html {
  scroll-behavior: smooth;
}
html, body {
  overflow-x: hidden;
}
body {
  background: #f5f5f5;
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

.box-form {
  margin-bottom: 20px;
  label {
    display: block;
    font-weight: bold;
  }
  .box-input {
    border: 2px solid transparent;
    padding: 5px 20px;
    font-size: 16px;
    line-height: 2;
    border-radius: 1rem;
    margin-top: 5px;
    box-sizing: border-box;
    background: #efefef;
  }

  .btn {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid transparent;
    transition: .3s;
    color: white;
    border-radius: .7rem;
    cursor: pointer;
    box-shadow: 0 5px 8px 10px rgb(0 0 0 / 5%);

    &.btn-primary {
      background: linear-gradient(45deg, #ff9800, #ff5722);
      font-size: 16px;
    }
    &:disabled {
      background: #ddd;
    }
  }

  &.error {
    .box-input {
      border: 2px solid #f44336;
    }
    .form-error {
      color: #f44336;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}


.list-options {
  li {
    display: inline-block;
    margin: 3px;
  }
}

.container {
  padding: 0 20px;
  margin: 0 auto;
}
.box {
  box-shadow: 0 5px 8px 10px rgb(0 0 0 / 5%);
  padding: 20px;
  border-radius: .7rem;
  display: inline-block;

  &.sm {
    padding: 10px;
  }
  
}

.box-check {
  .box {
    cursor: pointer;
  }
  input {
    display: none;
  }
}

input:checked ~ .box, .box.active, .box.optionable:hover {
  background: linear-gradient(45deg, #ff9800, #ff5722)!important;
  color: white!important;
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
.btn-style {
  background: #555555;
  border: none;
  padding: 5px;
  border-radius: 1rem;
  position: absolute;
  top: 20px;
  right: 130px;
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
  }
}

.page {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  background: #fff;
  &.dark-mode {
    background: #1b1c21;
    color: #838386;
    .box, .product-box.card {
      background: #25262b;
    }
    .box-input {
      color: white;
      background: #31323a;
    }
    .btn:disabled {
      background: #373d58;
    }
    .choose-option {
      color: white;
    }
    .back img {
      filter: invert(57%) sepia(6%) saturate(151%) hue-rotate(202deg) brightness(90%) contrast(82%);
    }
    .box-check a {
      color: white;
    }
  }
  .dark-mode-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>

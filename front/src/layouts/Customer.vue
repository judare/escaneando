<template>

<div class="page" :class="config.darkMode ? 'dark-mode' : ''">

  <div class="page-mobile">


    <div class="logo-page"></div>

    <div class="toggles dark-mode-button">
      <div class="options" :class="{ active: config.darkMode }" @click="toggleDarkMode">
        <div class="toggle-option left sun"/>
        <div class="toggle-option right night"/>
      </div>
    </div>

    <button @click="toggleStyle" class="btn-style" type="button" v-if="$route.name == 'menu'">
      <img :src="`/icons/${config.style}.png`">
    </button>
    <slot></slot>

    <app-footer/>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFooter from "@/components/AppFooter.vue"
import { postRequest } from "@/common/api.service.js";

export default {
  name: "customer-layout",
  computed: {
    ...mapGetters(["config"])
  },
  methods: {
    toggleDarkMode() {
      this.config.darkMode = !this.config.darkMode;
    },
    toggleStyle() {
      this.config.style = this.config.style == "list" ? "card" : "list";
    },
    getData() {
      if (!this.$route.params || !this.$route.params.slug)  return;
      let data = {
        "cellphone": this.config.cellphone,
        "commerce": this.$route.params.slug
      }
      postRequest("visitant/registerVisitant", data).then(result => {
        this.$store.commit("setVisitant", result.data);
      });
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
    },
    "$route"() {
      this.getData();
    }
  }
}
</script>
<style lang="scss">

.box-form {
  margin-bottom: 20px;
  label {
    display: block;
  }
  .box-input {
    border: 2px solid transparent;
    padding: 5px 20px;
    font-size: 16px;
    line-height: 2;
    border-radius: 8px;
    margin-top: 5px;
    box-sizing: border-box;
    background: #efefef;
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


.box {
  position: relative;
  // background: #EFECEC;
  padding: 20px;
  border-radius: .7rem;
  display: inline-block;
  border: 2px solid transparent;

  &.sm {
    padding: 8px 20px;
  }
  
}

.box-check {
  .box {
    cursor: pointer;
  }
  input {
    display: none;
  }
  .optionable {
    background: #0000001c;
  }
}

input:checked ~ .box, .box.active, .box.optionable:hover {
  background: transparent;
  &:before {
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius: 8px; /*1*/
    border: 2px solid transparent; /*2*/
    background:linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%) border-box; /*3*/
    -webkit-mask: /*4*/
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; /*5'*/
    mask-composite: exclude; /*5*/
  }
}


.toggles {
  border-radius: 100rem 100rem 100rem 100rem;
  width: 56px;
  height: 30px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  .options {
    position: absolute; 
    right: 0px;
    width: 112px;
    transition: .3s;

    &.active {
      right: -56px;
    }
    .toggle-option {
      width: 56px;
      height: 30px;
      display: inline-block;
      background-position: center;
      background-size: 19px 16px;
      background-repeat: no-repeat;
      &.right {
        border-radius: 0 1rem 1rem 0;
      }
      &.left {
        border-radius: 1rem 0rem 0rem 1rem;
      }
      &.sun {
        background-color: white;
        background-image: url(/icons/sun.png);
      }
      &.night {
        background-color: #353535;
        background-image: url(/icons/night.png);
      }
    }
  }
}
.btn-style {
  background: transparent;
  border: none;
  position: absolute;
  top: 20px;
  right: 100px;
  cursor: pointer;
  filter: invert(1);
  img {
    width: 30px;
    height: 32px;
  }
}

.page {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  .logo-page {
    background-image: url(/icons/logo-black.png);
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    background-position: center;
    padding: 20px;
  }
  &.dark-mode {
    background: #323740;
    color: #fff;
    .logo-page {
      background-image: url(/icons/logo-white.png);
    }

    .btn-style {
      filter: invert(0);
    }

    .box-input {
      color: white;
      background: #282D36;
    }
    .btn:disabled {
      background: #373d58;
    }
    .choose-option {
      color: white;
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

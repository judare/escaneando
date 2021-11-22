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
  mounted() {
    this.getData();
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
        "commerce": this.$route.params.slug
      }
      postRequest("visitant/getCommerce", data).then(result => {
        this.$store.commit("setCommerce", result.data.Commerce);
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
    padding: 5px 15px;
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

.border-custom {
  background: white;
  border: 0px transparent;
  border-radius: .8rem;
  background-origin: border-box;
  background-clip: content-box, border-box;
  padding: 2px;
  display:block;

  &.active {
    background-image: linear-gradient(#fff,#fff ), radial-gradient(circle at top left, #BBEC69,#455DD1);
    .box.sm {
      padding: 3px 15px;
    }
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
  .container {
    padding: 0 20px;
    margin: 0 auto;
  }
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
    .border-custom.active {
      background-image: linear-gradient(#323740,#323740),radial-gradient(circle at top left,#bbec69,#455dd1);
    }
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

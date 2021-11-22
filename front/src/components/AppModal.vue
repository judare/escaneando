<template>

 <transition name="fade" appear>
  <div class="modal" v-show="showing">
    <div class="modal-content">
      <div class="close" @click="hide()" v-if="!noClose">
        <img src="/icons/close.svg">
      </div>
      <slot></slot>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: "app-modal",
  props: {
    noClose: { default: false, type: Boolean }
  },
  data() {
    return {
      showing: false
    }
  },
  methods: {
    show() {
      this.showing = true;
    },
    hide() {
      this.$emit("close");
      this.showing = false;
    }
  },
  watch: {
    showing(a) {
      let root = document.getElementsByTagName( 'html' )[0];
      if (a) {
        document.body.classList.add("overflow-y-hidden");
        root.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
        root.classList.remove("overflow-y-hidden");
      }
    }
  }
}
</script>
<style lang="scss">
.overflow-y-hidden {
  overflow-y: hidden;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #00000033;
  z-index: 1000;
  overflow-y: auto;  
  padding: 30px 0px;

  .modal-content {
    max-width: 90%;
    width: 350px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 1rem;
    position: relative;
    box-sizing: border-box;
    .close {
      position: absolute;
      top: 17px;
      right: 17px;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
}
.dark-mode {
  .modal {
    background: rgb(52 52 63 / 50%);
    .modal-content {
      background: #16161a;
      .close {
        filter: invert(1);
      }
    }
  }
}

</style>
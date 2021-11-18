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
  }
}
</script>
<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #00000033;
  z-index: 1000;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  .modal-content {
    background: white;
    max-width: 450px;
    min-width: 250px;
    padding: 20px;
    border-radius: 1rem;
    position: relative;
    padding-top: 50px;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      text-align: center;
      cursor: pointer;
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
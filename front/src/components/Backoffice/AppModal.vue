<template>
<div>

  <div class="fixed bg-black bg-opacity-10 top-0 left-0 h-screen w-full z-20 " @click="hide" v-show="showing"/>
  
  <transition name="bounce">
    <section
      v-if="showing"
      class="rounded-3xl	text-black  p-8 fixed    bg-white z-20"
      :class="{
        'top-0 right-0 h-screen lg:w-4/12 md:rounded-r-none': position == 'right',
        'md:left-1/4 md:w-2/4 mx-5 w-3/4 bottom-0 rounded-b-none': position == 'bottom',
        [classSection]: true
      }"
    >
    <div class="overflow-y-auto" style="max-height: 100vh">
      <h2 class="text-2xl mb-5">{{title}}</h2>
    
      <slot></slot>
      </div>
    </section>
  </transition>

</div>
</template>

<script>

export default {
  name: "app-modal",
  props: {
    title: { required: false, default: null, type: String },
    position: { required: false, default: "right", type: String },
    classSection: { required: false, default: "", type: String },
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
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
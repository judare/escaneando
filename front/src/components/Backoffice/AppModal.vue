<template>


  <div v-if="showing">
    <div class="fixed bg-black bg-opacity-10 top-0 left-0 h-screen w-full z-10 " @click="hide"/>
    
    <transition name="fade">
      <section class="lg:w-3/12  md:rounded-r-none md:rounded-3xl	text-black  p-10 fixed h-screen top-0 right-0  bg-white z-20"  >
        <h2 class="text-2xl mb-5">{{title}}</h2>

        <slot></slot>
      </section>
    </transition>
  </div>

</template>

<script>
export default {
  name: "app-modal",
  props: ["title"],
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
}
</script>
<style lang="scss">
</style>
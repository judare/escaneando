<template>
<div class="page-content">

  <div class="container">

    <div class="v-align">
      <div class="enter-page">

        <div class="logo">
          <img src="https://olaclick.s3.amazonaws.com/companies/logos/cba9cbba-a3b6-4522-b4f0-eb9ddd51b2c1.JPG" alt="">
        </div>

        <h2 class="mb-5">Tenemos para ti</h2>

        <div class="box optionable choose-option" @click="goToMenu">
          <img src="/icons/menu.png">
          <div>Carta</div>
        </div>

        <div class="box optionable choose-option">
          <img src="/icons/review.png">
          <div>Reseña</div>
        </div>

        <div class="box optionable choose-option">
          <img src="/icons/pay.png">
          <div>Pagar</div>
        </div>

      </div>
    </div>



  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: 'Options',
  computed: {
    ...mapGetters(["config"])
  },
  methods: {
    goToMenu() {
      this.$router.push({ name: "menu" });
    }
  }
}
</script>

<style lang="scss">
.choose-option {
  display: inline-block;
  margin: 5px;
  box-sizing: content-box;
  text-align: center;
  cursor: pointer;
  img {
    width: 50px;
    margin-bottom: 10px;
  }
}
</style>

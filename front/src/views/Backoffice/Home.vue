<template>
<div class="backoffice-content">

  <div class="md:grid md:grid-cols-12 pr-10">

    <section class="	text-black m-3 col-span-7 "  >
      
      <router-link v-if="commerce.slug" :to="{ name: 'main', params: { slug: commerce.slug } }" class="float-right" target="_blank">🖇️ Ver mi sitio</router-link>
      
      <h2 class="text-4xl mb-5">¡Bienvenido!</h2>

      <h2 class="mb-3 text-xl ">ConseGeos ✌🏼</h2>
      <div class="rounded-3xl custom-border active p-5 mb-5" v-for="x in [1,2]" :key="x">
        <p>¡Recuerdales cuanto extrañas a tus clientes! <br>
        <span class="font-light">Visita el apartado clientes en la sección de recurrencias y audita sus visitas!</span></p> 
      </div>

      

    </section>

    <main class="main  m-3  col-span-5 rounded-3xl">
      <img src="/icons/backoffice/promo.svg" alt="">
    </main>
  </div>


</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  props: ["layoutProps"],
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(["commerce"])
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");


</style>

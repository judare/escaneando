<template>
<div class="backoffice-content">





  <div class="md:grid md:grid-cols-12">



    <section class="	text-black m-3 col-span-6 "  >
      

      <a :href="'/sitio/caverna-del-oso-pereira/options'" class="float-right" target="_blank">🖇️ Ver mi sitio</a>
      
      <h2 class="text-4xl mb-5">¡Bienvenido!</h2>

      <div class="rounded-3xl bg-green-200 p-10 mb-5" v-for="x in [1,2,3]" :key="x">
        <h2 class="text-2xl">ConseGeos ✌🏼</h2>
        <p>¡Recuerdales cuanto extrañas a tus clientes! <br>
        <span class="font-light">Visita el apartado clientes en la sección de recurrencias y audita sus visitas!</span></p> 
      </div>

      

    </section>

    <main class="main  m-3  col-span-6 bg-gray-100 rounded-3xl">
      <img src="/icons/backoffice/promo.svg" alt="">
    </main>
  </div>


</div>
</template>

<script>
export default {
  name: 'Home',
  props: ["layoutProps"],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");


</style>

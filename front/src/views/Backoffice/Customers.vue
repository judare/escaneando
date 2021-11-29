<template>
  <div class=" mx-auto">



  <div class="md:grid md:grid-cols-12">

    <section class="	text-black m-3 col-span-6 "  >
      
      <h2 class="text-2xl mb-5">Clientes</h2>
      <div class="table w-full" v-if="customers.length > 0">
        <table class="border-collapse	w-full">
          <thead>
            <tr class="text-left custom-border-table relative">
              <!-- <th class="p-5 font-light text-sm">Nombre</th> -->
              <th class="p-5 font-light text-sm">Celular</th>
              <th class="p-5 font-light text-sm">Primera visita</th>
              <th class="p-5 font-light text-sm">Última visita</th>
              <th class="p-5 font-light text-sm">Total visitas</th>
              <!-- <th class="p-5 font-light text-sm">Recurrencia</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="customer.id" >
              <!-- <td class="p-5 font-light rounded-l-2xl" :class="{'bg-gray-100': index % 2 != 0}">

              </td> -->
              <td class="p-5 font-light rounded-l-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.cellphone}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.firstVisit}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.lastVisit}}
              </td>
              <td class="p-5 font-light rounded-r-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.totalVisits}}
              </td>
              <!-- <td class="p-5 font-light rounded-r-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                <div class="font-medium text-center" :class="{ 'text-yellow-500': row < 0, 'text-green-400': row > 0 }">{{row}}%</div>
              </td> -->
            </tr>
            
          </tbody>
        </table>
      </div>
      <div v-else>
          <img src="/icons/backoffice/no-customers.svg" class="block mx-auto">

        <div class="text-center mt-3">
          <h2>¡Aún no tienes clientes!</h2>
          <h3 class="text-lg font-light ">
            Recuerda poner accesible tu código QR para que tus clientes puedan acceder a tus productos.
          </h3>
        </div>
      </div>


    </section>

    <main class="main  m-3  col-span-6  " >
  
      <div class="mb-10">
        <h2 class="text-2xl">Reseñas</h2>
        <p class="font-light">Conoce la opinión de tus clientes y utilizalos para tener una mejor visión de tu negocio.</p>
      </div>

      <h2 class="text-xl mb-3">Estadisticas</h2>
      
      <div class="font-light mb-5">
        <div class="mb-2" v-if="reviews.ReviewPrices > 0">
          <div class="review-bar inline-block rounded-3xl" :style="{ width: Math.floor((300 * reviews.ReviewPrices) / 5) + 'px' }"/>
          <div class="inline-block">({{reviews.ReviewPrices.toFixed(1)}}) Precios</div>
        </div>
        <div class="mb-2" v-if="reviews.ReviewProduct > 0">
          <div class="review-bar inline-block rounded-3xl" :style="{ width: Math.floor((300 * reviews.ReviewProduct) / 5) + 'px' }"/>
          <div class="inline-block">({{reviews.ReviewProduct.toFixed(1)}}) Producto</div>
        </div>
        <div class="mb-2" v-if="reviews.ReviewAttention > 0">
          <div class="review-bar inline-block rounded-3xl" :style="{ width: Math.floor((300 * reviews.ReviewAttention) / 5) + 'px' }"/>
          <div class="inline-block">({{reviews.ReviewAttention.toFixed(1)}}) Atención</div>
        </div>
      </div>



      <div class="w-full" v-if="reviews.Reviews.length > 0">
        <h2 class="text-xl mb-3">Últimas reseñas</h2>

        <div class="md:grid md:grid-cols-12">

          <div v-for="review in reviews.Reviews" :key="review.id" class="	text-black m-3 col-span-6 mb-4 border-b ">
            <p class="font-light">{{review.createdAt}}</p>

            <div class="md:grid md:grid-cols-12">
              <app-star v-if="review.prices" class="col-span-12 lg:col-span-4" size="sm" :stars="5" v-model="review.prices" :clickable="false" label="Precio"/>
              <app-star v-if="review.attention" class="col-span-12 lg:col-span-4" size="sm" :stars="5" v-model="review.attention" :clickable="false" label="Atención"/>
              <app-star v-if="review.product" class="col-span-12 lg:col-span-4" size="sm" :stars="5" v-model="review.product" :clickable="false" label="Producto"/>
            </div>

            <p class="font-light mt-3 pb-2">{{review.review}}</p>

          </div>
        </div>
      </div>
      <div v-else>
        <img src="/icons/backoffice/no-reviews.svg" class="block mx-auto">

        <div class="text-center mt-3">
          <h2 class="">¡Aún no tienes reseñas!</h2>
          <h3 class="text-lg font-light ">
            Comparte con tus clientes lo mucho que te gustaria saber su opinión.
          </h3>
        </div>
        
      </div>

      <!-- <div class="mb-10">


        <h2 class="text-2xl">Edades</h2>
      </div>
      <div class="mb-10">
        <h2 class="text-2xl">Sexos</h2>
      </div>
      <div class="mb-10">
        <h2 class="text-2xl">Cuidades principales</h2>
        <p class="font-light">Principales ciudades de visita</p>
      </div> -->
    </main>
  </div>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";
import AppStar from "../../components/AppStar.vue";

export default {
  components: { AppStar },
  name: 'Customers',
  props: ["layoutProps"],
  data() {
    return {
      customers: [],
      reviews: { Reviews: [] }
    }
  },
  methods: {
    list() {
      let data = {};
      postRequest("customers/list", data, this.user).then(result => {
        this.customers = result.data.People;
      });
    },
    listReviews() {
      let data = {
        commerceId: this.commerce.id
      };
      postRequest("customers/reviews", data, this.user).then(result => {
        this.reviews = result.data;
      });
    }
  },
  mounted() {
    this.listReviews();
    this.list();
  },
  computed: {
    ...mapGetters(["user", "commerce"])
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

.review-bar {
  background: linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%);
  height: 10px;
  margin-right: 20px;
}
</style>

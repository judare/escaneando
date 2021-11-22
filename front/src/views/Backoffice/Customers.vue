<template>
  <div class=" mx-auto">



  <div class="md:grid md:grid-cols-12">

    <section class="	text-black m-3 col-span-6 "  >
      
      <h2 class="text-2xl mb-5">Clientes</h2>
      <div class="table w-full">
        <table class="border-collapse	w-full">
          <thead>
            <tr class="text-left custom-border-table relative">
              <th class="p-5 font-light text-sm">Nombre</th>
              <th class="p-5 font-light text-sm">Celular</th>
              <th class="p-5 font-light text-sm">Primera visita</th>
              <th class="p-5 font-light text-sm">Última visita</th>
              <th class="p-5 font-light text-sm">Total visitas</th>
              <th class="p-5 font-light text-sm">Recurrencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="customer.id" >
              <td class="p-5 font-light rounded-l-2xl" :class="{'bg-gray-100': index % 2 != 0}">

              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.cellphone}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.firstVisit}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.lastVisit}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{customer.totalVisits}}
              </td>
              <td class="p-5 font-light rounded-r-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                <div class="font-medium text-center" :class="{ 'text-yellow-500': row < 0, 'text-green-400': row > 0 }">{{row}}%</div>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>


    </section>

    <main class="main  m-3  col-span-6  ">
  
      <div class="mb-10">
        <h2 class="text-2xl">Reseñas</h2>
        <p class="font-light">Conoce la opinión de tus clientes y utilizalos para tener una mejor visión de tu negocio.</p>
      </div>


      <div class="table w-full">
        <table class="border-collapse	w-full">
          <thead>
            <tr class="text-left custom-border-table relative">
              <th class="p-5 font-light text-sm">Reseña</th>
              <th class="p-5 font-light text-sm">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(review, index) in reviews" :key="review.id" >

              <td class="p-5 font-light rounded-l-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                {{review.review}}
              </td>
              <td class="p-5 font-light rounded-r-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                {{review.createdAt}}
              </td>
            </tr>
            
          </tbody>
        </table>
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

export default {
  name: 'Customers',
  props: ["layoutProps"],
  data() {
    return {
      customers: [],
      reviews: []
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
        console.log(result.data.Reviews);
        this.reviews = result.data.Reviews;
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


</style>

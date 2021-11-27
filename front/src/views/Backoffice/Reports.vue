<template>
<div class="backoffice-content">


  <div class="md:grid md:grid-cols-12">



    <section class="	text-black m-3 col-span-6 "  >
      
      <h2 class="text-xl">Últimas transacciones</h2>
      <div class="table w-full" v-if="transactions.length > 0">
        <table class="border-collapse	w-full">
          <tbody>
            <tr v-for="(row, index) in transactions" :key="index" >
              <td class="p-5 rounded-l-2xl">
                <div class="custom-border active py-5"> 
                  <img :src="'/icons/backoffice/banks/' + row.PaymentMethod.image" class="mx-auto" style="height: 20px">
                </div>
              </td>
              <td class="p-5">
                <div>{{row.PaymentMethod.name}}</div>
                <div class=" font-light">{{row.createdAt}}</div>
              </td>
              <td class="p-5 font-light">
                <div>
                  ${{money(row.amount)}} COP
                </div>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <div v-else>
        <img src="/icons/backoffice/no-transactions.svg" class="block mx-auto">

        <div class="text-center mt-3">
          <h2 class="">¡Aún no tienes transacciones!</h2>
          <h3 class="text-lg font-light ">
            anímate a empezar y generar más ingresos en tu negocio
          </h3>
        </div>
        
      </div>



    </section>

    <main class="main  m-3  col-span-6  ">
      <div class="rounded-3xl bg-advice p-10 mb-10">
        <h2 class="text-xl">ConseGeos ✌🏼</h2>
        <p>¡Recuerdales cuanto extrañas a tus clientes! <br>
        <span class="font-light">Visita el apartado clientes en la sección de recurrencias y audita sus visitas!</span></p> 
      </div>

    </main>
  </div>







</div>
</template>

<script>
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";

export default {
  name: 'Reports',
  props: ["layoutProps"],

  data() {
    return {
      transactions: []
    }
  },
  methods: {
    list() {
      let data = {};
      postRequest("transactions/list", data, this.user).then(result => {
        this.transactions = result.data.Transactions;
      });
    }
  },
  mounted() {
    this.list();
  },
  computed: {
    ...mapGetters(["user"])
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

.bg-advice {
  background: linear-gradient(266.88deg, rgba(249, 239, 91, 0.9) 1.79%, rgba(191, 240, 103, 0.9) 97.6%);
}
</style>

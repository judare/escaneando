<template>
<div class="backoffice-content">


  <div class="md:grid md:grid-cols-12">



    <section class="	text-black m-3 col-span-6 "  >
      
      <h2>Últimas transacciones</h2>
      <div class="table w-full">
        <table class="border-collapse	w-full">
          <tbody>
            <tr v-for="(row, index) in transactions" :key="index" >
              <td class="p-5 rounded-l-2xl">
                <div class="custom-border active py-5"> 
                  <img :src="row.Bank.image" class="mx-auto" style="height: 20px">
                </div>
              </td>
              <td class="p-5">
                <div>{{row.Bank.name}}</div>
                <div class=" font-light">{{row.date}}</div>
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



    </section>

    <main class="main  m-3  col-span-6  ">
      <div class="rounded-3xl bg-advice p-10 mb-10">
        <h2 class="text-xl">ConseGeos ✌🏼</h2>
        <p>¡Recuerdales cuanto extrañas a tus clientes! <br>
        <span class="font-light">Visita el apartado clientes en la sección de recurrencias y audita sus visitas!</span></p> 
      </div>

      <div>
        <h2 class="text-2xl">Recurrencia</h2>
      </div>
    </main>
  </div>







</div>
</template>

<script>
export default {
  name: 'Reports',
  props: ["layoutProps"],
  data() {
    return {
      transactions: [
        {
          amount: 25000,
          date: "Sep 14, 2021 a las 9:35 pm",
          Bank: {
            name: "Nequi",
            image: "/icons/backoffice/banks/nequi.svg"
          }
        },
        {
          amount: 10000,
          date: "Sep 14, 2021 a las 9:35 pm",
          Bank: {
            name: "Daviplata",
            image: "/icons/backoffice/banks/davivienda.svg"
          }
        },
        {
          amount: 7000,
          date: "Sep 14, 2021 a las 9:35 pm",
          Bank: {
            name: "Bancolombia",
            image: "/icons/backoffice/banks/bancolombia.svg"
          }
        },
        {
          amount: 7000,
          date: "Sep 14, 2021 a las 9:35 pm",
          Bank: {
            name: "Bancolombia",
            image: "/icons/backoffice/banks/bancolombia.svg"
          }
        },
        {
          amount: 7000,
          date: "Sep 14, 2021 a las 9:35 pm",
          Bank: {
            name: "Bancolombia",
            image: "/icons/backoffice/banks/bancolombia.svg"
          }
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

.bg-advice {
  background: linear-gradient(266.88deg, rgba(249, 239, 91, 0.9) 1.79%, rgba(191, 240, 103, 0.9) 97.6%);
}
</style>

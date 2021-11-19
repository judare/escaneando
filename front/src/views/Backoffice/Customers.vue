<template>
  <div class="container mx-auto">




  <div class="md:grid md:grid-cols-12">



    <section class="	text-black m-3 col-span-6 "  >
      
      <h2 class="text-2xl mb-5">Clientes</h2>
      <div class="table w-full">
        <table class="border-collapse	w-full">
          <thead>
            <tr class="text-left custom-border-table relative">
              <th class="p-5 font-light text-sm">Nombre</th>
              <th class="p-5 font-light text-sm">Celular</th>
              <th class="p-5 font-light text-sm">Última visita</th>
              <th class="p-5 font-light text-sm">Total visitas</th>
              <th class="p-5 font-light text-sm">Recurrencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in [-30,90,35,45,95,-85,95,-15]" :key="index" >
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">

              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">3222901435</td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">Ayer</td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">15</td>
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
        <h2 class="text-2xl">Datos & Estadisticas</h2>
        <p class="font-light">Conoce datos especificios de tus clientes y utilizalos para tener una mejor visión de tu negocio.</p>
      </div>
      <div class="mb-10">


        <h2 class="text-2xl">Edades</h2>
      </div>
      <div class="mb-10">
        <h2 class="text-2xl">Sexos</h2>
      </div>
      <div class="mb-10">
        <h2 class="text-2xl">Cuidades principales</h2>
        <p class="font-light">Principales ciudades de visita</p>
      </div>
    </main>
  </div>


  </div>
</template>

<script>

export default {
  name: 'Customers',
  props: ["layoutProps"],
  data() {
    return {
      chartData: {}
    }
  },
  methods: {
  },
  mounted() {
    const data = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    this.chartData = data;

  },
  components: {
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

.custom-border-table {
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    content: "";
    display:block;
    background: linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%);
  }
}
</style>

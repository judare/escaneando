<template>
  <div class="container mx-auto">
    <div class="table w-full">
      <table class="border-collapse	w-full">
        <thead>
          <tr class="text-left">
            <th class="p-5">ID</th>
            <th class="p-5">Celular</th>
            <th class="p-5">Última visita</th>
            <th class="p-5">Total visitas</th>
            <th class="p-5"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in [1,2,3,4,5,5,5,5]" :key="index" >
            <td class="p-5 rounded-l-2xl" :class="{'bg-gray-100': index % 2 == 0}">1</td>
            <td class="p-5" :class="{'bg-gray-100': index % 2 == 0}">3222901435</td>
            <td class="p-5" :class="{'bg-gray-100': index % 2 == 0}">Ayer</td>
            <td class="p-5" :class="{'bg-gray-100': index % 2 == 0}">15</td>
            <td class="p-5 rounded-r-2xl" :class="{'bg-gray-100': index % 2 == 0}">15</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Customers',
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

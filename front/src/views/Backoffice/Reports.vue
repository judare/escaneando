<template>
<div class="backoffice-content">



  <div class="table w-full">
    <table class="border-collapse	w-full">
      <tbody>
        <tr v-for="(row, index) in [1,2,3,4,5,5]" :key="index" >
          <td class="p-5 rounded-l-2xl">1</td>
          <td class="p-5">
            <div>Bancolombia</div>
            <div>Sep 14, 2021 a las 9:35 pm</div>
          </td>
          <td class="p-5">
            <div>
              $35.000 COP
            </div>
          </td>
        </tr>
        
      </tbody>
    </table>
  </div>


</div>
</template>

<script>
export default {
  name: 'Reports',
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

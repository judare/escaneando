<template>
<div class="page-content" >
<div class="container text-center" >

  


  <div class="header">
    <div class="logo">
      <img src="https://olaclick.s3.amazonaws.com/companies/logos/cba9cbba-a3b6-4522-b4f0-eb9ddd51b2c1.JPG" alt="">
    </div>
  </div>

  <ul class="list-options" >
    <li class="box-check">
      <input type="radio" value="card" v-model="config.style" id="check-card">
      <label class="box" for="check-card">Card</label>
    </li>
    <li class="box-check">
      <input type="radio" value="list" v-model="config.style" id="check-list">
      <label for="check-list" class="box">Lista</label>
    </li>
  </ul>




  <ul class="list-options" v-scroll-spy-active v-scroll-spy-link>
    <li class="box-check">
      <a class="box">Comida</a>
    </li>
    <li class="box-check">
      <a class="box">Cocktails</a>
    </li>
    <li class="box-check">
      <a class="box">Cervezas</a>
    </li>
  </ul>


  <div class="products" :class="'products-' + config.style" v-scroll-spy>
    <app-product v-for="p in products" :key="p.id" :product="p" :style="config.style"/>
  </div>
</div>
</div>
</template>

<script>
import AppProduct from "@/components/Product.vue";
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      products: [{
        id: 1,
        name: "Hamburguesa doble queso",
        image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/b3a30c33-5c31-424d-91db-a94fc9e654bd.jpeg",
        price: 10000
      },
      {
        id: 2,
        name: "Malteada",
        image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/4effb35d-9b99-41bb-ad5b-5fe00ea0d507.jpg",
        price: 20000,
        description: "200 gr de carne 100% Angus, lechuga crespa, tomate, cebolla encurtida, pan artesanal de orégano parmesano, queso americano y tocineta ahumada, acompañada de papa casco encostrada en Lemon Pepper."
      },
      {
        id: 3,
        name: "Papas fritas",
        image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
        price: 10000
      }]
    }
  },
  components: {
    AppProduct
  },
  computed: {
    ...mapGetters(["config"])
  }
}
</script>

<style lang="scss">

.products {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  &.products-card {
    flex-direction: row;
  }
}


</style>

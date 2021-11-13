<template>
<div class="page-content" >
<div class="container text-center" >


  <app-header/>

  <ul class="list-options mb-5">
    <li class="box-check" v-for="category in products" :key="category.id">
      <a class="box sm optionable" :href="'#cat-' + category.id">{{category.name}}</a>
    </li>

  </ul>


  <div v-for="category in products" :id="'cat-' + category.id" :key="category.id">

    <h3 class="mb-5">{{category.name}}</h3>
    <div class="products mb-5" :class="'products-' + config.style" >
      <app-product v-for="p in category.products" :key="p.id" :product="p" :style="config.style"/>
    </div>
  </div>
</div>
</div>
</template>

<script>
import AppProduct from "@/components/AppProduct.vue";
import AppHeader from "@/components/AppHeader.vue";
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      products: [{
        id: 1,
        name: "Cocktail",
        products: [
          {
            id: 1,
            name: "Hamburguesa doble queso",
            image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/b3a30c33-5c31-424d-91db-a94fc9e654bd.jpeg",
            price: 10000,
            description: "El cremoso de la casa! vive california, sueña californication Jack Daniel´s N°7 , Amaretto, Crema de Coco, Limón."
          },
          {
            id: 3,
            name: "Papas fritas",
            image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            description: "Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas.",
            price: 10000
          },
           {
            id: 4,
            name: "Papas fritas",
            image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/6e9b794a-4c93-4f56-a6d8-37795e44de13.jpeg",
            description: "Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas.",
            price: 10000
          }]
        },
        {
          id: 2,
          name: "Comidas",
          products: [{
            id: 1,
            name: "Hamburguesa doble queso",
            image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/b3a30c33-5c31-424d-91db-a94fc9e654bd.jpeg",
            price: 10000,
            description: "El cremoso de la casa! vive california, sueña californication Jack Daniel´s N°7 , Amaretto, Crema de Coco, Limón."
          }]
        },
        {
          name: "Bebidas",
          id: 3,
          products: [{
            id: 2,
            name: "Malteada",
            image: "https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/4effb35d-9b99-41bb-ad5b-5fe00ea0d507.jpg",
            price: 20000,
            description: "200 gr de carne 100% Angus, lechuga crespa, tomate, cebolla encurtida, pan artesanal de orégano parmesano, queso americano y tocineta ahumada, acompañada de papa casco encostrada en Lemon Pepper."
          }]
        }
      ]
    }
  },
  components: {
    AppHeader,
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
  flex-wrap: wrap;
  &.products-card {
    flex-direction: row;
  }
}


</style>

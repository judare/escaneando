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
      <app-product v-for="p in category.Products" :key="p.id" :product="p" :style="config.style"/>
    </div>
  </div>
</div>
</div>
</template>

<script>
import AppProduct from "@/components/AppProduct.vue";
import AppHeader from "@/components/AppHeader.vue";
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";

// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      products: []
    }
  },
  methods: {
    getProducts() {
      let data = {
        "visitantToken": this.visitant.token,
        "commerce": this.$route.params.slug
      }
      postRequest("visitant/listProducts", data).then(result => {
        this.products = result.data.Products;
      });
    }
  },
  mounted() {
    this.getProducts();
  },
  components: {
    AppHeader,
    AppProduct
  },
  computed: {
    ...mapGetters(["config", "visitant"])
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

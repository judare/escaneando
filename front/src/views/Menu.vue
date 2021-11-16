<template>
<div class="page-content" >
<div class="container text-center" >


  <div class="back mb-5" @click="back">
    <img src="/icons/back.png">
  </div>

  <div class="mb-5">

    <div class="logo-right">
      <img :src="visitant.Commerce.logo" alt="">
    </div>

    <h3 v-if="visitant && visitant.Commerce">{{visitant.Commerce.name}}</h3>
    <h2>Nuestros productos</h2>
  </div>


  <ul class="list-options mb-5">
    <li class="box-check" v-for="(category, i) in products" :key="category.id">
      <a class="box sm optionable" :class="{active: i == 0}" :href="'#cat-' + category.id">{{category.name}}</a>
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
// import AppHeader from "@/components/AppHeader.vue";
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
    },
    back() {
      this.$router.push({ name: "options", params: { slug: this.$route.params.slug } });
    }
  },
  mounted() {
    this.getProducts();
  },
  components: {
    // AppHeader,
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
.back {
  cursor: pointer;
}
.logo-right {
  width: 70px;
  height: 70px;
  float: right;
  img {
    border-radius: 1rem;
    max-width: 100%;
  }
}

</style>

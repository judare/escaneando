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

    <h3 class="commerce-name" v-if="visitant && visitant.Commerce">{{visitant.Commerce.name}}</h3>
    <h2 style="font-weight: 500;">Nuestros productos</h2>
  </div>


  <ul class="list-options menu-categories mb-5">
    <li class="box-check" v-for="(category, i) in products" :key="category.id">
      <a class="" :class="{'border-custom active': i == 0}" :href="'#cat-' + category.id">
        <span class="box sm optionable">{{category.name}}</span>
      </a>
    </li>

  </ul>


  <div v-for="category in products" :id="'cat-' + category.id" :key="category.id">

    <h3 class="mb-2">{{category.name}}</h3>
    <div class="products mb-2" :class="'products-' + config.style" >
      <app-product v-for="p in category.Products" :key="p.id" :product="p" :style="config.style" v-on:click-product="clickProduct"/>
    </div>
  </div>
</div>

<app-modal ref="showProduct">
  <div v-if="product" class="product-modal">
    <div class="top mb-5">
      <div class="image">
        <img :src="product.image" alt="">
      </div>
      <div class="desc">
        <h2>{{product.name}}</h2>
        <h3>${{money(product.price)}}</h3>
      </div>
    </div>
    <div class="desc">{{product.description}}</div>
  </div>

</app-modal>


</div>
</template>

<script>
import AppProduct from "@/components/AppProduct.vue";
// import AppHeader from "@/components/AppHeader.vue";
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";
import AppModal from "@/components/AppModal.vue";

// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      product: null
    }
  },
  methods: {
    getProducts() {
      let data = {
        "visitantToken": this.visitant.token,
        "commerce": this.$route.params.slug
      }
      postRequest("visitant/listProducts", data).then(result => {
        this.$store.commit("setVisitantProducts", result.data.Products);
      });
    },
    back() {
      this.$router.push({ name: "options", params: { slug: this.$route.params.slug } });
    },
    clickProduct(product) {
      this.$refs.showProduct.show();
      this.product = product;
    }
  },
  mounted() {
    this.getProducts();
  },
  components: {
    AppProduct,
    AppModal
  },
  computed: {
    ...mapGetters(["config", "visitant", "products"])
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
.product-modal {
  .top {
    h2,h3 {
      font-weight: 500;
    }
    .image {
      max-width: 250px;
      margin-right: 20px;
      margin: 0 auto;
      img {
        width: 100%;
        border-radius: 1rem;
      }
    }
  }
  .desc {
    font-weight: 300;
  }
}
.menu-categories  {
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

</style>

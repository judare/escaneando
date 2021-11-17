<template>

  <div class="product-box" :class="style" @click="$emit('click-product', product)">
    <div class="product-img" v-if="product.image">
      <img :src="product.image" alt="">
    </div>

    <div class="product-description">
      <h4 class="product-name">{{product.name}}</h4>
      <p v-if="style == 'list'">{{product.description}}</p>

      <h5 class="product-price">${{money(product.price)}}</h5>

    </div>
    
  </div>
</template>
<script>
export default {
  name: "app-product",
  props: {
    product: { required: true, default: null, type: Object },
    style: { default: "card", required: false, type: String }
  }
  
}
</script>

<style lang="scss">
.product-box {
  user-select: none;
  flex-direction: column;
  justify-content: center;
  transition: .3s;
  border-color: transparent;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 300;

  .product-img {
    display: flex;
    flex: 1;
  }
  .product-description {
    flex: 1;
  }
  .product-img {
    img {
      border-radius: 1rem;
    }
  }

  &.card {
    width: 33%;
    padding: 7px 14px;
    box-sizing: border-box;

    .product-img {
      margin-bottom: 20px;
      img {
        width: 100%;
      }
    }
    .product-name {
      font-weight: 500;
    }
    .product-price {
      margin: 10px 0;
      font-size: 16px;
      font-weight: 300;
    }
  }

  &.list {
    flex-direction: row;
    margin: 7px 0;
    .product-img {
      max-width: 90px;
      img {
        max-width: 70px;
        max-height: 70px;
      }
    }
    .product-price {
      max-width: 80px;
    }
    .product-description {
      text-align: left;
      flex-direction: column;
    }
  }

 
  .product-description {
    .product-name {
      line-height: 1;
      font-size: .9rem;
      margin: 0;
    }
    p {
      font-size: 10px;
      margin: 0;
    }
  }
  
}


</style>
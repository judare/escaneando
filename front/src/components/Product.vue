<template>

  <div class="product-box" :class="style">
    <div class="product-img">
      <img :src="product.image" alt="">
    </div>

    <div class="product-description">
      <h4 class="product-name">{{product.name}}</h4>
      <p v-if="style == 'list'">{{product.description}}</p>
    </div>

    <h5 class="product-price">${{product.price}}</h5>
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
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  transition: .3s;
  border-color: transparent;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .product-img, .product-price, .product-description {
    display: flex;
    flex: 1;
  }

  &.card {
    background: #fff;
    box-shadow: 0 5px 8px 10px rgb(0 0 0 / 5%);
    width: 150px;
    border-radius: 1rem;

    .product-img {
      margin-bottom: 20px;
      img {
        width: 100%;
        border-radius: 1rem 1rem 0 0;
      }
    }
  }

  &.list {
    flex-direction: row;
    .product-img {
      max-width: 200px;
      justify-content: center;
      img {
        max-width: 120px;
        max-height: 120px;
        border-radius: 1rem;
      }
    }
    .product-price {
      max-width: 100px;
    }
    .product-description {
      text-align: left;
      flex-direction: column;
    }
  }

 
  .product-description {
    .product-name {
      line-height: 1;
      font-size: 1rem;
      margin: 0;
    }
    p {
      font-size: 10px;
    }
  }
  
}


</style>
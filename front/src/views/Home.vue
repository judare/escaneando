<template>
<div class="page" :class="darkMode ? 'dark-mode' : ''">
<div class="container text-center" >


<label>
  <input type="checkbox" v-model="darkMode" :value="!darkMode" id="">
  DarkMode
</label>
  <ul class="list-options">
    <li class="box-check">
      <input type="radio" value="card" v-model="style" id="check-card">
      <label class="box" for="check-card">Card</label>
    </li>
    <li class="box-check">
      <input type="radio" value="list" v-model="style" id="check-list">
      <label for="check-list" class="box">Lista</label>
    </li>
  </ul>




  <ul class="list-options">
    <li class="box-check">
      <input type="radio" value="food" v-model="style" id="check-card">
      <label class="box" for="check-card">Comida</label>
    </li>
    <li class="box-check">
      <input type="radio" value="cocktails" v-model="style" id="check-list">
      <label for="check-list" class="box">Cocktails</label>
    </li>
    <li class="box-check">
      <input type="radio" value="cocktails" v-model="style" id="check-list">
      <label for="check-list" class="box">Cervezas</label>
    </li>
  </ul>


  <div class="products" :class="'products-' + style">
    <app-product v-for="p in products" :key="p.id" :product="p" :style="style"/>
  </div>
</div>
</div>
</template>

<script>
import AppProduct from "@/components/Product.vue"
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      style: "card",
      darkMode: false,
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
  }
}
</script>

<style scoped lang="scss">
ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.list-options {
  li {
    display: inline-block;
    margin: 10px;
  }
}
.container {
  max-width: 1000px;
  margin: 0 auto;
}
.box {
  box-shadow: 0 5px 8px 10px rgb(0 0 0 / 5%);
  width: 150px;
  padding: 20px;
  border-radius: .7rem;
  display: inline-block;
}

.box-check {
  .box {
    cursor: pointer;
  }
  input {
    display: none;
  }
  input:checked ~ .box {
    background: linear-gradient(45deg, #ff9800, #ff5722);
    color: white;
  }
}

.products {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  &.products-card {
    flex-direction: row;
  }
}

.page {
  min-height: 100vh;
  &.dark-mode {
    background: #1b1c21;
    color: #838386;
    .box, .product-box.card {
      background: #25262b;
    }
  }
}

</style>

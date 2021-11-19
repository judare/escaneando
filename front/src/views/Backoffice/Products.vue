<template>
<div class="backoffice-content">

<h2 class="text-4xl mb-5">La caverna del oso / La rebeca</h2>

<div class="categories mb-10">
  <div v-for="(c, i) in products" :key="c.id" class="custom-border px-10 py-3 inline-block mr-5 cursor-pointer font-light align-top" @click="selectCategory(i)" :class="{ 'active': i == category }">
    {{c.name}}
  </div>

  <div class="custom-border px-10 py-3  inline-block mr-5 cursor-pointer active align-top" @click="createCategory">
    <img src="/icons/plus.svg" style="height: 23px;">
  </div>
</div>

<div class="products">
<div class="flex flex-wrap">
  <div  class="mr-5 my-3 overflow-hidden custom-border flex flex-row justify-center	items-center cursor-pointer active " style="width: 160px!important;" @click="createProduct">
    <div class="">

      <img src="/icons/plus.svg" alt="" class="block mx-auto mb-5">

      <div class="text-center font-light">Añadir producto</div>
    </div>
  </div>
  
  
  
  <draggable 
    v-model="products[category].Products" 
    group="people" 
    @start="drag=true" 
    @end="drag=false" 
    tag="transition-group"
    item-key="id">
    <template #item="{element}">
      <div  class="cursor-pointer my-3 mr-5 rounded-xl overflow-hidden border border-transparent group" :class="{ 'opacity-50': drag }" style="width: 160px!important;">

        
        <div class="grid grid-cols-1">
            <div class="relative z-10 col-start-1 row-start-1 px-4 pt-28 pb-3 bg-gradient-to-t from-black relative" @click="showProduct(element)">

              <div class="w-full absolute top-0 left-0 z-10 h-full show-hover custom-border active flex flex-row justify-center items-center">
                <div>
                  <img src="/icons/pencil.svg" class="mx-auto mb-5"/>
                  <span class="font-light">Editar producto</span>
                </div>
              </div>

              <!-- <p class="text-sm font-medium text-white">Entire house</p> -->
              <div class="text-left  text-white">
                <h2 class="font-medium h-12">{{element.name}}</h2>
                <h3 class="font-light font-sm">${{money(element.price)}}</h3>
              </div>
            </div>

            <div class="col-start-1 row-start-1 flex">
              <div class="w-full grid grid-cols-3 grid-rows-2 gap-2">
                <div class="relative col-span-3 row-span-2">
                  <img :src="element.image" loading="lazy" alt="" class="absolute inset-0 w-full h-full object-cover bg-gray-100">
                </div>
              </div>
            </div>
          </div>
        </div>
    </template>
  </draggable>

</div>

</div>

<app-modal ref="createProductModal" :title="product.id ? 'Editar producto' : 'Agregar producto'">
  <app-input type="select" label="Categoria" v-model="product.categoryId">
    <option v-for="c in products" :key="c.id" :value="c.id">
      {{c.name}}
    </option>

  </app-input>

  <app-input type="text" label="Nombre" v-model="product.name" />

  <app-drag-file label="Fotos" class="mb-5"/>


  <app-input type="textarea" label="Descripción" v-model="product.description"/>

  <app-input type="money" label="Precio" v-model="product.price"/>



  <app-button variant="primary" class="mt-5">
    Agregar producto
  </app-button>
  <app-button variant="secondary" @click="deleteProduct" v-if="product.id">
    Eliminar producto
  </app-button>

</app-modal>


<app-modal ref="createCategoryModal" :title="categoryItem.id ? 'Editar categoria' : 'Agregar categoria'" position="bottom">

  <app-input type="text" label="Nombre" v-model="categoryItem.name" />

  <app-button variant="primary" class="mt-5">
    Agregar categoria
  </app-button>
  <app-button variant="secondary" @click="deleteProduct" v-if="categoryItem.id">
    Eliminar category
  </app-button>

</app-modal>




<app-modal ref="deleteProductModal" position="bottom" title="Estas seguro de eliminar el producto?">
  <div class="mb-5 font-light">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, amet reiciendis deserunt facilis voluptatem laboriosam recusandae dolore a distinctio laborum earum odit sequi aut. Incidunt amet numquam soluta nobis! Accusantium?
  </div>
  <app-button variant="primary" v-if="product.id">
    Si, Eliminar
  </app-button>

</app-modal>

</div>
</template>

<script>

import AppDragFile from "@/components/Form/AppDragFile.vue";
import draggable from 'vuedraggable'

export default {
  name: 'Products',
  props: ["layoutProps"],
  data() {
    return {
      category: 0,

      categoryItem: {},

      products: [
   {
      "id":1,
      "name":"Comida",
      "Products":[
         {
            "id":1,
            "name":"Hamburguesa doble queso",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/b3a30c33-5c31-424d-91db-a94fc9e654bd.jpeg",
            "description":"El cremoso de la casa! vive california, sueña californication Jack Daniel´s N°7 , Amaretto, Crema de Coco, Limón",
            "price":10000,
            "categoryId": 1
         },
         {
            "id":2,
            "name":"Club colombia dorada",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas",
            "price":10000,
            "categoryId": 1
         },
         {
            "id":3,
            "name":"Papas fritas",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/6e9b794a-4c93-4f56-a6d8-37795e44de13.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas.",
            "price":10000,
            "categoryId": 1
         },
         {
            "id":5,
            "name":"Club colombia dorada",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas",
            "price":10000,
            "categoryId": 1
         },
         {
            "id":6,
            "name":"Club colombia dorada",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas",
            "price":10000,
            "categoryId": 1
         },
         {
            "id":7,
            "name":"Club colombia dorada",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas",
            "price":10000,
            "categoryId": 1
         },
         {
            "id":8,
            "name":"Club colombia dorada",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas",
            "price":10000
         },
         {
            "id":9,
            "name":"Club colombia dorada",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/23029d8c-36b9-4958-a655-150ca4d80de2.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas",
            "price":10000
         }
      ]
   },
   {
      "id":2,
      "name":"Bebidas",
      "Products":[
         {
            "id":4,
            "name":"Cerveza BBC",
            "image":"https://qlickmenu.s3-us-west-1.amazonaws.com/companies/products/b3a30c33-5c31-424d-91db-a94fc9e654bd.jpeg",
            "description":"Queso provolone asado, acompañado de jamón serrano, ensalada fresca de rúgula y cherry, pan baguette artesanal y chutney de uchuvas.",
            "price":10000
         }
      ],
   }
],
      drag: false,
      product: {}
    }
  },
  mounted() {
  },
  methods: {
    deleteProduct() {
      this.$refs.deleteProductModal.show();
    },
    showProduct(product) {
      this.product = product;
      this.$refs.createProductModal.show();
    },
    selectCategory(i) {
      this.category = i;
    },
    createProduct() {
      this.product = {};
      this.$refs.createProductModal.show();
    },
    createCategory() {
      this.categoryItem = {};
      this.$refs.createCategoryModal.show();
    }
  },
  components: {
    draggable,
    AppDragFile
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

.show-hover {
  background: #fff;
  opacity: 0;
  transition: .1s;

  &:hover {
    opacity: 1;
  }
}

</style>

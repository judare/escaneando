<template>
<div class="backoffice-content">

<h2 class="text-4xl mb-5">{{commerce.name}}</h2>

<div class="categories mb-5">

  <div class="custom-border inline-block mb-5  align-top  mr-5 gray" :class="{ 'active': i == category }" v-for="(c, i) in products" :key="c.id">
    <div  class=" pl-8 py-2 cursor-pointer font-light justify-between	 flex" @click="selectCategory(i)">
      <div>{{c.name}}</div>
      <div class="ml-4 pr-4 cursor-pointer" @click="editCategory(c)">✏️</div>
    </div>
  </div>

  <div class="custom-border active align-top inline-block">
    <div class=" px-8 py-2 cursor-pointer " @click="createCategory">
      <img src="/icons/plus.svg" style="height: 23px;">
    </div>
  </div>
</div>

<div class="products" v-if="products.length > 0">
<div class="flex flex-wrap">
  <div  class="mr-5 my-3 overflow-hidden custom-border flex flex-row cursor-pointer active " style="width: 160px!important;" @click="createProduct">
    <div class="py-12 mx-auto">

      <img src="/icons/plus.svg" alt="" class="block mx-auto mb-5">

      <div class="text-center font-light">Añadir producto</div>
    </div>
  </div>
  
  

    <draggable 
    v-if="category != null"
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

                <div class="custom-border active absolute top-0 left-0 z-10 w-full  h-full show-hover flex flex-row justify-center items-center">
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
<div v-else>
  <img src="/icons/backoffice/no-products.svg" class="block mx-auto">

  <div class="text-center mt-3">
    <h2 class="">¡Aún no tienes productos!</h2>
    <h3 class="text-lg font-light ">
      Recuerda que puedes agregarlos desde el apartado ubicado en la parte superior izquierda.
    </h3>
  </div>

</div>

<app-modal ref="viewProductModal" :title="product.id ? 'Editar producto' : 'Agregar producto'">

  <form v-on:submit.prevent="submitProduct">
    <app-errors ref="errorProduct"/>

    <div :class="{'grid grid-cols-12': product.image}">
      <div class="	text-black m-3 col-span-4"   v-if="product.image">
        <img :src="product.image" class="rounded-xl">
      </div>
      <div :class="{'col-span-8': product.image}">

        
        <app-input type="select" label="Categoria" v-model="product.categoryId">
          <option v-for="c in products" :key="c.id" :value="c.id">
            {{c.name}}
          </option>
        </app-input>

        <app-input type="text" label="Nombre" v-model="product.name" />
      </div>
    </div>

    <app-drag-file v-on:change="uploadPhoto" label="Fotos" class="mb-5" labelBottom="Solo una foto de tu producto" :limit="1"/>


    <app-input type="textarea" label="Descripción" v-model="product.description"/>

    <app-input type="money" label="Precio" v-model="product.price"/>


    <template v-if="loading">
      <div class="text-center mx-auto">
        <app-loader class="block mx-auto mb-3"/>
      </div>
      
    </template>
    <template v-else>
      <app-button variant="primary" class="mt-5" type="submit" v-if="!product.id">
        Agregar producto
      </app-button>
      <app-button variant="primary" class="mt-5" type="submit" v-else>
        Editar producto
      </app-button>
    </template>
    
  
  </form>
  <app-button variant="secondary" @click="deleteProduct" v-if="product.id">
    Eliminar producto
  </app-button>

</app-modal>


<app-modal ref="viewCategoryModal" :title="categoryItem.id ? 'Editar categoria' : 'Agregar categoria'" position="right">

  <app-errors ref="errorCategory"/>

  <form v-on:submit.prevent="submitCategory">
    <app-input type="text" label="Nombre" v-model="categoryItem.name" />

    <template v-if="loading">
      <div class="text-center mx-auto">
        <app-loader class="block mx-auto mb-3"/>
      </div>
    </template>
    <template v-else>
      <app-button variant="primary" class="mt-5" type="submit" v-if="!categoryItem.id">
        Agregar categoria
      </app-button>
      <app-button variant="primary" class="mt-5" type="submit" v-else>
        Editar categoria
      </app-button>
    </template>
    
  </form>
  <app-button variant="secondary" @click="deleteCategory" v-if="categoryItem.id">
    Eliminar categoria
  </app-button>

</app-modal>




<app-modal ref="deleteProductModal" position="right" title="Estas seguro de eliminar el producto?">
  <div class="mb-5 font-light">
    ¿Estas seguro que deseas eliminar el producto? <br><br>
    Recuerda que puedes editarlo si necesitas modificar algun tipo de información.<br><br>
  Si deseas crear un nuevo, en el apartado crear producto podrás realizarlo.
  </div>
  <app-button variant="primary" v-if="product.id" @click="confirmDeleteProduct">
    Si, Eliminar
  </app-button>


</app-modal>


<app-modal ref="deleteCategoryModal" position="right" title="Eliminar categoria">

  <app-errors ref="errorDeleteCategory"/>

  <div class="mb-5 font-light">
    ¿Estas seguro que deseas eliminar esta categoria?<br><br>
   Recuerda que puedes editarlo si necesitas modificar algun tipo de información. <br>
Además toda la información contenida en esta categoria será eliminada <br>
Si deseas crear una nueva categoria, en el apartado crear categoria podrás realizarlo.
  </div>
  <app-button variant="primary" v-if="categoryItem.id" @click="confirmDeleteCategory">
    Si, Eliminar
  </app-button>
</app-modal>



</div>
</template>

<script>

import AppDragFile from "@/components/Form/AppDragFile.vue";
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex';
import { postRequest, postMultimedia } from "@/common/api.service.js";

export default {
  name: 'Products',
  props: ["layoutProps"],
  data() {
    return {
      category: null,

      categoryItem: {},

      products: [],
      drag: false,
      product: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters(["user", "commerce"])
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    editCategory(c) {
      this.categoryItem = c;
      this.$refs.viewCategoryModal.show();
    },
    getProducts() {
      if (!this.commerce.id) return;
      let data = {
        commerceId: this.commerce.id
      }
      postRequest("products/list", data, this.user).then(result => {
        this.products = result.data.Products;
        if (this.category == null)  this.category = 0;
      });
    },
    deleteProduct() {
      this.$refs.deleteProductModal.show();
    },
    deleteCategory() {
      this.$refs.deleteCategoryModal.show();
    },
    confirmDeleteProduct() {
      let data = {
        productId: this.product.id
      }
      postRequest("products/delete", data, this.user).then(() => {
        this.getProducts();
        this.$refs.deleteProductModal.hide();
        this.$refs.viewProductModal.hide();
      });
    },
    confirmDeleteCategory() {
      this.$refs.errorDeleteCategory.clear();
      let data = {
        categoryId: this.categoryItem.id
      }
      postRequest("products/deleteCategory", data, this.user).then(() => {
        this.category = 0;
        this.getProducts();
        this.$refs.deleteCategoryModal.hide();
        this.$refs.viewCategoryModal.hide();
      })
      .catch(err => {
        this.$refs.errorDeleteCategory.put(err.message);
      });
    },
    showProduct(product) {
      this.product = product;
      this.$refs.viewProductModal.show();
    },
    selectCategory(i) {
      this.category = i;
    },
    submitProduct() {
      if (!this.product.id) {
        this.confirmCreateProduct()
      } else {
        this.confirmUpdateProduct()
      }
    },
    submitCategory() {
      if (!this.categoryItem.id) {
        this.confirmCreateCategory()
      } else {
        this.confirmUpdateCategory()
      }
    },
    createProduct() {
      this.product = {
        commerceId: this.commerce.id,
        categoryId: this.products[this.category].id
      };
      this.$refs.viewProductModal.show();
    },
    confirmCreateProduct() {
      this.loading = true;
      this.$refs.errorProduct.clear();
      postRequest("products/create", this.product, this.user).then(() => {
        this.getProducts();
        this.$refs.viewProductModal.hide();
      })
      .catch(err => {
        this.$refs.errorProduct.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    confirmUpdateProduct() {
      this.loading = true;
      this.$refs.errorProduct.clear();
      let data = {
        ...this.product,
        productId: this.product.id
      }
      postRequest("products/update", data, this.user).then(() => {
        this.getProducts();
        this.$refs.viewProductModal.hide();
      })
      .catch(err => {
        this.$refs.errorProduct.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    confirmUpdateCategory() {
      this.loading = true;
      this.$refs.errorCategory.clear();
      let data = {
        ...this.categoryItem,
        categoryId: this.categoryItem.id
      }
      postRequest("products/updateCategory", data, this.user).then(() => {
        this.getProducts();
        this.$refs.viewCategoryModal.hide();
      })
      .catch(err => {
        this.$refs.errorCategory.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    createCategory() {
      this.categoryItem = {
        commerceId: this.commerce.id,
      };
      this.$refs.viewCategoryModal.show();
    },
    confirmCreateCategory() {
      this.$refs.errorCategory.clear();
      postRequest("products/createCategory", this.categoryItem, this.user).then(() => {
        this.getProducts();
        this.$refs.viewCategoryModal.hide();
      })
      .catch(err => {
        this.$refs.errorCategory.put(err.message);
      });
    },
    uploadPhoto(pics) {
      this.$refs.errorProduct.clear();

      if (pics.length == 0){
        this.product.image = this.product._image;
        this.product._image = null;
        return;
      }

      if (!this.product._image) {
        this.product._image = this.product.image;
      }

      this.loading = true;
      let formData = new FormData();
      formData.append("file", pics[0])

      postMultimedia("products/uploadImage", formData, this.user).then(result => {
        this.product.image = result.data.Resource.url;
      })
      .catch(err => {
        this.$refs.errorProduct.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
  components: {
    draggable,
    AppDragFile
  },
  watch: {
    commerce() {
      this.getProducts();
    }
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

</style>

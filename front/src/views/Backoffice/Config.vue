<template>
<div class="backoffice-content">


  <div class="md:grid md:grid-cols-12">
    <div class="main  m-3  col-span-12  ">

      <form v-on:submit.prevent="saveBusiness">
        <h2 class="text-2xl mb-5">Datos generales del comercio</h2>

        <div class="md:grid md:grid-cols-12">
          <div class="main  m-3  col-span-4  p-3">


            <app-errors ref="errorBusiness"/>

            <app-input type="text" v-model="business.name" label="Razón social"/>
            <app-input type="text" v-model="business.nit" label="NIT"/>
            <app-input type="text" v-model="business.email" label="Email"/>
              
          </div>
          <div class="col-span-4 p-3">
            <app-input type="file" v-on:changeFile="(p) => uploadDocument('fileCommerce', p)" v-model="business.fileCommerce" label="Camara y comercio"/>
            <app-input type="file" v-on:changeFile="(p) => uploadDocument('fileRut', p)" v-model="business.fileRut" label="RUT"/>

            <app-button class="mt-5" variant="primary" type="submit" >Guardar cambios</app-button>
          </div>
        </div>
      </form>
    </div>
    <section class="	text-black m-3 col-span-12 "  >
      

      <div class="flex items-center justify-between">
      <h2 class="text-2xl mb-5">Sucursales</h2>

      <div class="custom-border active">
        <div class=" px-5 py-2 inline-block cursor-pointer font-light" @click="createCommerce">Crear sucursal</div>
      </div>

      </div>

      <div class="table w-full">
        <table class="border-collapse	w-full">
          <thead>
            <tr class="text-left custom-border-table relative">
              <th class="p-5 font-light text-sm">Imagen</th>
              <th class="p-5 font-light text-sm">Nombre</th>
              <th class="p-5 font-light text-sm">Dirección</th>
              <th class="p-5 font-light text-sm">Celular</th>
              <th class="p-5 font-light text-sm">Correo</th>
              <th class="p-5 font-light text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, index) in commerces" :key="c.id" >
              <td class="p-5 font-light rounded-l-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                <img :src="c.logo" style="max-height: 60px;" class="rounded-xl">
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.name}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.address}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.cellphone}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.email}}
              </td>
              <td class=" font-light rounded-r-2xl" :class="{'bg-gray-100': index % 2 != 0}" style="min-width: 140px">
                <div class="inline-block custom-border active cursor-pointer text-center mr-2"  @click="viewCommerce(c)">
                  <div class="px-2 py-1 font-light">Ver</div>
                </div>

                <router-link v-if="c.slug" :to="{ name: 'main', params: { slug: c.slug } }" class="float-right" target="_blank">
                  <div class="inline-block custom-border active cursor-pointer text-center">
                    <div class="px-2 py-1 font-light">Ver sitio</div>
                  </div>
                </router-link>
                
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>


    </section>

    
  </div>

  <app-modal :title="commerceForm.id ? 'Editar la configuración de ' + commerceForm.name : 'Crear comercio'" ref="viewCommerce" position="right">
    <form v-on:submit.prevent="submitCommerce">

      <app-errors ref="errorCommerce"/>
      
      <div :class="{'grid grid-cols-12': commerceForm.logo}">
        <div class="	text-black m-3 col-span-4"   v-if="commerceForm.logo">
          <img :src="commerceForm.logo" class="rounded-xl">
        </div>
        <div :class="{'col-span-8': commerceForm.logo}">

          <app-input type="text" label="Nombre del comercio" v-model="commerceForm.name" />
          <app-input type="text" label="Celular del comercio" v-model="commerceForm.cellphone" />
          <app-input type="text" label="Dirección del comercio" v-model="commerceForm.address" />
          
        </div>
      </div>

      <app-drag-file v-on:change="uploadPhoto" label="Foto del comercio" class="mb-5" labelBottom="Solo una foto de tu comercio" :limit="1"/>

      <app-input type="text" label="Link del facebook" v-model="commerceForm.facebook" />
      <app-input type="text" label="Link del instagram" v-model="commerceForm.instagram" />
      <app-input type="text" label="Correo del comercio" v-model="commerceForm.email" />
      <template v-if="loading">
        <app-loader class="mx-auto block"/>
      </template>
      <template v-else>
        
        <app-button type="submit" label="Correo del comercio" variant="primary">
          Guardar
        </app-button>
      </template>

    </form>

  </app-modal>

</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppDragFile from "@/components/Form/AppDragFile.vue";
import { postMultimedia, postRequest } from "@/common/api.service.js";

export default {
  name: 'Config',
  components: {
    AppDragFile
  },
  props: ["layoutProps"],
  data() {
    return {
      commerceForm: {},
      loading: false
    }
  },
  methods: {
    list() {
      postRequest("commerces/list", {}, this.user).then(result => {
        this.$store.commit("setCommerces", result.data.Commerces);
      });
    },
    viewCommerce(c) {
      this.commerceForm = c;
      this.$refs.viewCommerce.show();
    },
    createCommerce() {
      this.commerceForm = {};
      this.$refs.viewCommerce.show();
    },
    submitCommerce() {
      if (!this.commerceForm.id) {
        this.confirmCreateCommerce()
      } else {
        this.confirmUpdateCommerce()
      }
    },
    confirmCreateCommerce() {
      this.loading = true;
      this.$refs.errorCommerce.clear();
      postRequest("commerces/create", this.commerceForm, this.user).then(() => {
        this.list();
        this.$refs.viewCommerce.hide();
      })
      .catch(err => {
        this.$refs.errorCommerce.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    saveBusiness() {
      this.loading = true;
      this.$refs.errorBusiness.clear();
      postRequest("commerces/updateBusiness", this.business, this.user).then(() => {
        this.list();
        this.$refs.viewCommerce.hide();
      })
      .catch(err => {
        this.$refs.errorBusiness.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    confirmUpdateCommerce() {
      this.loading = true;
      this.$refs.errorCommerce.clear();
      let data = {
        ...this.commerceForm,
        commerceId: this.commerceForm.id
      }
      postRequest("commerces/update", data, this.user).then(() => {
        this.list();
        this.$refs.viewCommerce.hide();
      })
      .catch(err => {
        this.$refs.errorCommerce.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    uploadDocument(documentKey, pics) {
      console.log(pics);
      this.loading = true;
      let formData = new FormData();
      formData.append("file", pics[0])

      postMultimedia("products/uploadImage", formData, this.user).then(result => {
        this.business[documentKey] = result.data.Resource.url;
      })
      .finally(() => {
        this.loading = false;
      });
    },
    uploadPhoto(pics) {
      this.$refs.errorCommerce.clear();

      if (pics.length == 0){
        this.commerceForm.logo = this.commerceForm._logo;
        this.commerceForm._logo = null;
        return;
      }

      if (!this.commerceForm._logo) {
        this.commerceForm._logo = this.commerceForm.logo;
      }

      this.loading = true;
      let formData = new FormData();
      formData.append("file", pics[0])

      postMultimedia("products/uploadImage", formData, this.user).then(result => {
        this.commerceForm.logo = result.data.Resource.url;
      })
      .catch(err => {
        this.$refs.errorCommerce.put(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["commerce", "commerces", "user", "business"])
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");


</style>

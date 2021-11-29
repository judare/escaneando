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
    <section class="text-black m-3 col-span-12">
      <h2 class="text-2xl mb-5">Sucursales</h2>

      <div class="flex flex-wrap">
        <div  class="mr-5 my-3 overflow-hidden custom-border flex flex-row cursor-pointer active " style="width: 160px!important;" @click="createCommerce">
          <div class="py-12 mx-auto">

            <img src="/icons/plus.svg" alt="" class="block mx-auto mb-5">

            <div class="text-center font-light">Crear sucursal</div>
          </div>
        </div>

        <div  class="cursor-pointer my-3 mr-5 rounded-xl overflow-hidden border border-transparent group" style="width: 160px!important;" v-for="c in commerces" :key="c.id"  >
          <div class="grid grid-cols-1">
              <div class="relative z-10 col-start-1 row-start-1 px-4 pt-28 pb-3 bg-gradient-to-t from-black relative" @click="viewCommerce(c)">

                <div class="custom-border active absolute top-0 left-0 z-10 w-full  h-full show-hover flex flex-row justify-center items-center">
                  <div>
                    <img src="/icons/pencil.svg" class="mx-auto mb-5"/>
                    <span class="font-light">Editar sucursal</span>
                  </div>
                </div>
                <!-- <p class="text-sm font-medium text-white">Entire house</p> -->
                <div class="text-left  text-white">
                  <h2 class="font-medium h-12">{{c.name}}</h2>
                  <h3 class="font-light font-sm">{{c.cellphone}}</h3>
                </div>
              </div>

              <div class="col-start-1 row-start-1 flex">
                <div class="w-full grid grid-cols-3 grid-rows-2 gap-2">
                  <div class="relative col-span-3 row-span-2">
                    <img :src="c.logo" loading="lazy" alt="" class="absolute inset-0 w-full h-full object-cover bg-gray-100">
                  </div>
                </div>
              </div>
            </div>
          </div>
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

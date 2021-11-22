<template>
<div class="backoffice-content">


  <div class="md:grid md:grid-cols-12">

    <section class="	text-black m-3 col-span-6 "  >
      

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
              <th class="p-5 font-light text-sm">Nombre</th>
              <th class="p-5 font-light text-sm">Celular</th>
              <th class="p-5 font-light text-sm">Correo</th>
              <th class="p-5 font-light text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, index) in commerces" :key="c.id" >
              <td class="p-5 font-light rounded-l-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.name}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.cellphone}}
              </td>
              <td class="p-5 font-light" :class="{'bg-gray-100': index % 2 != 0}">
                {{c.email}}
              </td>
              <td class="p-5 font-light rounded-r-2xl" :class="{'bg-gray-100': index % 2 != 0}">
                <div class="custom-border active cursor-pointer text-center"  @click="viewCommerce(c)">
                  <div class="px-5 py-2 font-light">Ver</div>
                </div>
                
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>


    </section>

    <main class="main  m-3  col-span-6  ">

    </main>
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
    ...mapGetters(["commerce", "commerces", "user"])
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");


</style>

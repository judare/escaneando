<template>
<div class="page-content">

  <div class="container">

    <div class="v-align">

      <app-loader v-show="loading"/>
      <div class="enter-page" v-show="!loading">

        <div class="logo" v-if="visitant && visitant.Commerce">
          <img :src="visitant.Commerce.logo">
        </div>

        <h3 class="commerce-name" v-if="visitant && visitant.Commerce">{{visitant.Commerce.name}}</h3>


        <h2 class="mb-5" style="font-weight: 500;">¡Queremos <br> conocerte!</h2>


        <div class="box-form" :class="{ error: !!formErrors.cellphone }">
          <label style="text-align: left">Escribe tu número de celular</label>
          <input type="number" pattern="\d*"  inputmode="numeric" class="box-input w-100" v-model="form.cellphone">

          <div class="form-error" v-if="formErrors.cellphone">
            {{formErrors.cellphone}}
          </div>
        </div>

        <div class="box-form mb-5">
          <label>
            <input type="checkbox" v-model="form.terms">
            Autorizo el uso de la información
          </label>
        </div>

        <div class="box-form">
          <button type="button" class="btn btn-primary w-100" @click="validateCellphone" :disabled="!form.terms">
            Continuar
          </button>
        </div>
      </div>
    </div>



  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppLoader from "@/components/AppLoader.vue";
import { postRequest } from "@/common/api.service.js";
// @ is an alias to /src
export default {
  name: 'Main',
  data() {
    return {
      form: {},
      formErrors: {},
      loading: false
    }
  },
  mounted() {

    if (this.config.cellphone) {
      this.enterMenu();
    }
  },
  methods: {
    enterMenu() {
      this.loading = true

      let data = {
        "cellphone": this.config.cellphone,
        "commerce": this.$route.params.slug
      }

      postRequest("visitant/registerVisitant", data).then(result => {
        this.$store.commit("setVisitant", result.data);
        this.$router.replace({ name: "options", params: { slug: this.$route.params.slug } });
      });
      
    },
    validateCellphone() {
      let cellphone = "" + this.form.cellphone;
      this.formErrors = {};
      if (!cellphone || cellphone.length != 10) {
        this.formErrors.cellphone = "El celular debe contener 10 digitos";
        return;
      }
      this.config.cellphone = this.form.cellphone;
      this.enterMenu();
    }
  },
  computed: {
    ...mapGetters(["config", "visitant"])
  },
  components: {
    AppLoader
  }
}
</script>

<style lang="scss">
.enter-page {
  max-width: 320px;
  margin: 0 auto;

  .logo {
    text-align: left;
    img {
      max-width: 50px;
      max-height: 50px;
      border-radius: 1rem;
    }
  }
}
.commerce-name {
  font-weight: 300;
}

</style>

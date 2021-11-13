<template>
<div class="page-content">

  <div class="container">

    <div class="v-align">

      <app-loader v-show="loading"/>
      <div class="enter-page" v-show="!loading">

        <div class="logo">
          <img src="https://olaclick.s3.amazonaws.com/companies/logos/cba9cbba-a3b6-4522-b4f0-eb9ddd51b2c1.JPG" alt="">
        </div>

        <h2 class="mb-5">Queremos conocerte</h2>


        <div class="box-form" :class="{ error: !!formErrors.cellphone }">
          <label>Escribe tu número de celular</label>
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
      setTimeout(() => { //TODO REQUEST
        this.$router.replace({ name: "options" });
      }, 600);
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
    ...mapGetters(["config"])
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
  h2 {
    text-align: center;
  }

  .logo {
    text-align: center;
    margin-bottom: 20px;
    img {
      max-width: 100px;
      max-height: 100px;
      border-radius: 1rem;
    }
  }
}

</style>

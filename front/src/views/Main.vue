<template>
<div class="page-content">

  <div class="container">
    <h2>Queremos conocerte</h2>


    <div class="box-form">
      <label>Escribe tu celular</label>
      <input type="number" step="none" class="box-input" v-model="form.cellphone">

      <div class="form-error" v-if="formErrors.cellphone">
        {{formErrors.cellphone}}
      </div>
    </div>

    <div class="box-form">
      <label>
        <input type="checkbox" v-model="form.terms">
        Autorizo el uso de la información
      </label>
    </div>

    <div class="box-form">
      <button type="button" @click="validateCellphone" :disabled="!form.terms">
        Continuar
      </button>
    </div>



  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: 'Main',
  data() {
    return {
      form: {},
      formErrors: {}
    }
  },
  methods: {
    validateCellphone() {
      let cellphone = "" + this.form.cellphone;
      this.formErrors = {};
      if (!cellphone || cellphone.length != 10) {
        this.formErrors.cellphone = "El celular debe contener 10 digitos";
      }
    }
  },
  computed: {
    ...mapGetters(["config"])
  }
}
</script>

<style lang="scss">
</style>

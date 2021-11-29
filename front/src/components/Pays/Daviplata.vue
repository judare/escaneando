<template>
<div>
  <div class="mb-5" v-if="step == 1">
     <p>Daviplata te enviará un codigo de seis digitos tan pronto dejes los datos de tu documento de identidad.</p>

    <label for="docType" class="form-label">Tipo de documento</label>
      <select class="box-input w-100 mb-2" v-model="form.People.docType" placeholder="Número de documento" id="docType">
        <option value="01">CEDULA DE CIUDADANIA</option>
        <option value="02">CEDULA DE EXTRANJERÍA</option>
        <option value="03">NIT</option>
        <option value="04">TARJETA DE IDENTIDAD</option>
        <option value="05">PASAPORTE</option>
        <option value="06">TRJ. SEGURO SOCIAL EXTRANJERO</option>
        <option value="10">RIF VENEZUELA</option>
        <option value="13">REGISTRO CIVIL</option>
        <option value="90">RUT</option>
      </select>

    <label for="docNumber" class="form-label">Número de documento</label>
    <input id="docNumber" inputmode="numeric" class="box-input w-100 mb-5" v-model="form.People.docNumber" placeholder="Número de documento"/>

    <div class="box-form">
      <template v-if="!loading">
        <button type="button" class="btn btn-primary w-100" @click="sendPay">
          Completar el pago
        </button>
      </template>
      <template v-else>
        <app-loader style="margin: 0 auto;"/>
      </template>
    </div>

  </div>

  <div class="mb-5" v-if="step == 2">
    <p>Daviplata ha enviado un mensaje de texto a su móvil con el código que
        debe ingresar para poder continuar con el proceso de pago.</p>
    <label for="otp" class="form-label">Digite el codigo</label>
    <input id="otp" inputmode="numeric" class="box-input mb-5 w-100" v-model="otp" placeholder="Codigo"/>

    <div class="box-form">
      <template v-if="!loading">
        <button type="button" class="btn btn-primary w-100" @click="finishPay">
          Terminar el pago
        </button>
      </template>
      <template v-else>
        <app-loader style="margin: 0 auto;"/>
      </template>
    </div>

  </div>

  <div class="mb-5" v-if="step == 3">
    <div class="mb-5"></div>
    <h2>🥳 <br> Pago terminado con éxito</h2>

  </div>

  

</div>
</template>
<script>
import { postRequest } from "@/common/api.service.js";
import { mapGetters } from "vuex";

export default {
  name: "app-pay-daviplata",
  props: ["amount"],
  data() {
    return {
      otp: "",
      step: 1,
      transactionId: null,
      loading: false,
      form: {
        paymentMethodId: 2,
        People: {
          docType: "01"
        }
      }
    }
  },
  methods: {
    sendPay() {
      this.loading = true;
      let data = {
        ...this.form,
        visitantToken: this.visitant.token,
        commerce: this.$route.params.slug,
        amount: this.amount
      }
      postRequest("visitant/processPay", data).then(result => {
        this.transactionId = result.data.transactionId;
        this.step = 2;
      })
      .finally(() => {
        this.loading = false;
      });
    },
    
    finishPay() {
      this.loading = true;
      let data = {
        transactionId: this.transactionId,
        visitantToken: this.visitant.token,
        commerce: this.$route.params.slug,
        otp: this.otp
      }
      postRequest("visitant/confirm/daviplata/button", data).then(result => {
        this.step = 3;
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["visitant"])
  }
}
</script>
<style lang="scss"></style>
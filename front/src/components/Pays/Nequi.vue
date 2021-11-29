<template>
<div>
  <div class="mb-5" v-if="step == 1">
    <p>Número de celular que tienes registrado en NEQUI.</p>

    <label for="cellphoneForm" class="form-label">Número de celular</label>
    <input id="cellphoneForm" inputmode="numeric" class="box-input w-100 mb-5" v-model="form.cellphone" placeholder="Celular"/>

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
    
    holi

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
  name: "app-pay-nequi",
  props: ["amount"],
  data() {
    return {
      loading: false,
      otp: "",
      step: 1,
      transactionId: null,
      form: {
        paymentMethodId: 3,
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
    }
  },
  computed: {
    ...mapGetters(["visitant"])
  }
}
</script>
<style lang="scss"></style>
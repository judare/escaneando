<template>
<div>
  <div class="mb-5" v-if="step == 1">
    <p>Digita la información para ser redirigido al portal de PSE.</p>

    <label for="typePerson" class="form-label">Tipo de persona</label>
    <select class="box-input w-100 mb-2" v-model="form.People.typePerson"  id="typePerson">
      <option :value="0">Natural</option>
      <option :value="1">Jurídica</option>
    </select>

    <label for="name" class="form-label">Nombre</label>
    <input id="name" name="fullName" inputmode="numeric" class="box-input w-100 mb-2" v-model="form.name" placeholder="Nombre"/>

    <label for="docType" class="form-label">Tipo de documento</label>
    <select class="box-input w-100 mb-2" v-model="form.People.docType" id="docType">
      <option value="cc">CEDULA DE CIUDADANIA</option>
      <option value="ce">CEDULA DE EXTRANJERÍA</option>
    </select>

    <label for="docNumber" class="form-label">Número de documento</label>
    <input id="docNumber" inputmode="numeric" class="box-input w-100 mb-2" v-model="form.document" placeholder="Número de documento" name="document" type="number"/>

    <label for="bank" class="form-label">Banco</label>
    <select class="box-input w-100 mb-5" v-model="form.bank" name="bank" id="bank">
      <option value="0">A continuación seleccione su banco</option><option value="1040">BANCO AGRARIO</option><option value="1052">BANCO AV VILLAS</option><option value="1013">BANCO BBVA COLOMBIA S.A.</option><option value="1032">BANCO CAJA SOCIAL</option><option value="1019">BANCO COLPATRIA</option><option value="1066">BANCO COOPERATIVO COOPCENTRAL</option><option value="1051">BANCO DAVIVIENDA</option><option value="1001">BANCO DE BOGOTA</option><option value="1023">BANCO DE OCCIDENTE</option><option value="1062">BANCO FALABELLA </option><option value="1012">BANCO GNB SUDAMERIS</option><option value="1060">BANCO PICHINCHA S.A.</option><option value="1002">BANCO POPULAR</option><option value="1058">BANCO PROCREDIT</option><option value="1065">BANCO SANTANDER COLOMBIA</option><option value="1007">BANCOLOMBIA</option><option value="1061">BANCOOMEVA S.A.</option><option value="1009">CITIBANK </option><option value="1292">CONFIAR COOPERATIVA FINANCIERA</option><option value="1551">DAVIPLATA</option><option value="1006">ITAU</option><option value="1507">NEQUI</option>
    </select>

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
  name: "app-pay-pse",
  props: ["amount"],
  data() {
    return {
      otp: "",
      step: 1,
      transactionId: null,
      loading: false,
      form: {
        paymentMethodId: 4,
        bank: "1007",
        People: {
          docType: "cc",
          typePerson: 0,
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
<template>
<div class="page-content">

  <div class="container">

    <div class="v-align">
      <div class="enter-page">

        <div class="logo" v-if="visitant && visitant.Commerce">
          <img :src="visitant.Commerce.logo">
        </div>
        <h3 class="commerce-name" v-if="visitant && visitant.Commerce">{{visitant.Commerce.name}}</h3>

        <h2 class="mb-5" style="font-weight: 500;">¡Tenemos para ti!</h2>


        <div class="box optionable choose-option active" @click="goToMenu">
          <!-- <img src="/icons/menu.png"> -->
          <div><strong>🍔 Nuestro Menú</strong></div>
          <p>Aquí encontraras todos nuestros productos</p>
        </div>

        <div class="box optionable choose-option active" @click="pay">

          <div><strong>💸 Realizar pago</strong></div>
          <p>Procesa el pago de tus compras</p>

        </div>

        <div class="box optionable choose-option active" @click="review">
          <div><strong>💬 Cuentanos tu experiencia</strong></div>
          <p>Escribe aquí una reseña sobre que te piensas</p>
        </div>

      </div>
    </div>


  <app-modal ref="reviewModal">
     <div class="box-form font-light" :class="{ error: !!formErrors.opinion }">

      <div class="text-center">👋🏻   💬   😄</div>
      <h2>¿Qué tal estuvo tu experiencia?</h2>
      <p>Cuentanos que tal te parecio nuestro lugar, nuestra comida y todo lo que nos quieras contar! Estamos felices de escucharte!</p>
      <textarea class="box-input w-100" v-model="form.opinion">
      </textarea>

      <div class="form-error" v-if="formErrors.opinion">
        {{formErrors.opinion}}
      </div>
    </div>

     <div class="box-form">
      <button type="button" class="btn btn-primary w-100" @click="putOpinion" :disabled="!form.opinion">
        Enviar opinión
      </button>
    </div>
  </app-modal>



  <app-modal ref="payModal">
    

    <div class="box-form" :class="{ error: !!formErrors.amount }">

      <div class="text-center">👋🏻   💸   💳</div>
      <h2>Escribe el valor a pagar</h2>
      <p>A contuniación serás redirigido a la pasarle de pagos para que completes el proceso de manera segura y rápida.</p>

      <input type="number" pattern="\d*"  inputmode="numeric" class="box-input w-100" v-model="form.amount">

      <div class="form-error" v-if="formErrors.amount">
        {{formErrors.amount}}
      </div>
    </div>

     <div class="box-form">
      <button type="button" class="btn btn-primary w-100" @click="goToPay" :disabled="!form.amount">
        Completar el pago
      </button>
    </div>

  </app-modal>

  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppModal from "@/components/AppModal.vue";
import { postRequest } from "@/common/api.service.js";

// @ is an alias to /src
export default {
  name: 'Options',
  computed: {
    ...mapGetters(["config", "visitant"])
  },
  data() {
    return {
      formErrors: {},
      form: {}
    }
  },
  components: {
    AppModal
  },
  methods: {
    goToMenu() {
      this.$router.push({ name: "menu", params: { slug: this.$route.params.slug }});
    },
    review() {
      this.$refs.reviewModal.show();
    },
    pay() {
      this.$refs.payModal.show();
    },
    putOpinion() {
      let data = {
        "review": this.form.opinion,
        "visitantToken": this.visitant.token,
        "commerce": this.$route.params.slug
      }
      postRequest("visitant/createReview", data).then(result => {
        this.$refs.reviewModal.hide();
        alert("Ok!");
      });
    },
    goToPay() {

    }
  }
}
</script>

<style lang="scss">
.choose-option {
  display: inline-block;
  margin: 5px 0;
  text-align: left;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  p {
    font-size: 13px;
    margin: 0;
  }

  img {
    width: 50px;
    margin-bottom: 10px;
  }
}
.box-form {
  text-align: center;
  h2  {
    font-weight: 500;
  }
  p {
    font-weight: 300;
  }
}
</style>

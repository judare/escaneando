<template>
<div class="page-content">

  <div class="container">

    <div class="v-align">
      <div class="enter-page">

        <div class="logo">
          <img src="https://olaclick.s3.amazonaws.com/companies/logos/cba9cbba-a3b6-4522-b4f0-eb9ddd51b2c1.JPG" alt="">
        </div>

        <h2 class="mb-5">Tenemos para ti</h2>

        <div class="box optionable choose-option" @click="goToMenu">
          <img src="/icons/menu.png">
          <div>Carta</div>
        </div>

        <div class="box optionable choose-option" @click="review">
          <img src="/icons/review.png">
          <div>Reseña</div>
        </div>

        <div class="box optionable choose-option" @click="pay">
          <img src="/icons/pay.png">
          <div>Pagar</div>
        </div>

      </div>
    </div>


  <app-modal ref="reviewModal">
     <div class="box-form" :class="{ error: !!formErrors.opinion }">
      <label>Escribe tu opinión</label>
      <textarea class="box-input w-100" v-model="form.opinion">
        </textarea>

      <div class="form-error" v-if="formErrors.opinion">
        {{formErrors.opinion}}
      </div>
    </div>

     <div class="box-form">
      <button type="button" class="btn btn-primary w-100" @click="putOpinion" :disabled="!form.opinion">
        OPINAR
      </button>
    </div>
  </app-modal>



  <app-modal ref="payModal">

    <div class="box-form" :class="{ error: !!formErrors.amount }">
      <label>Escribe el valor a pagar</label>
      <input type="number" pattern="\d*"  inputmode="numeric" class="box-input w-100" v-model="form.amount">

      <div class="form-error" v-if="formErrors.amount">
        {{formErrors.amount}}
      </div>
    </div>

     <div class="box-form">
      <button type="button" class="btn btn-primary w-100" @click="goToPay" :disabled="!form.amount">
        IR A PAGAR
      </button>
    </div>

  </app-modal>

  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppModal from "@/components/AppModal.vue";
// @ is an alias to /src
export default {
  name: 'Options',
  computed: {
    ...mapGetters(["config"])
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

    },
    goToPay() {

    }
  }
}
</script>

<style lang="scss">
.choose-option {
  display: inline-block;
  margin: 5px;
  box-sizing: content-box;
  text-align: center;
  cursor: pointer;
  img {
    width: 50px;
    margin-bottom: 10px;
  }
}
</style>

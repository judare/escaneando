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



  <app-modal ref="payModal" v-on:close="backPay">
  
      <div class="text-center" style="text-align: center">👋🏻   💸   💳</div>

      <template v-if="stepPay == 1">
        <div class="box-form" :class="{ error: !!formErrors.amount }">
          <h2>Escribe el valor a pagar</h2>
          <p></p>

          <input type="number" pattern="\d*"  inputmode="numeric" class="box-input w-100" v-model="form.amount" >

          <div class="form-error" v-if="formErrors.amount">
            {{formErrors.amount}}
          </div>
        </div>

        <div class="box-form">
          <button type="button" class="btn btn-primary w-100" @click="goToPay" :disabled="!form.amount">
            Continuar el pago
          </button>
        </div>
      </template>
      <template v-else>
        <div class="box-form" :class="{ error: !!formErrors.amount }">

          <div class="back" @click="backPay()" style="float: left">
            <img src="/icons/back.png">
          </div>

          <h2>Escoge el medio de pago</h2>
          <p>A contuniación serás redirigido a la pasarle de pagos para que completes el proceso de manera segura y rápida.</p>

          <ul class="methods">
            <li class="method-pay" v-for="method in methods" :key="method.id" :class="{ disabled: form.amount < method.valMin, active: form.payMethodId == method.id }" @click="selPayMethod(method)">
              <div class="method-image">
                <img :src="method.image" alt="">
              </div>
              <div class="method-name">{{method.name}}</div>
              <div class="method-value">Val minimo ${{money(method.valMin)}}</div>
            </li>
          </ul>
        </div>

      
        <div class="box-form">
          <button type="button" class="btn btn-primary w-100" @click="goToPay" :disabled="!form.payMethodId">
            Completar el pago
          </button>
        </div>
      </template>

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
      form: {},
      stepPay: 1,
      methods: [{
        id: 1,
        image: "/icons/banks/bancolombia.png",
        name: "Bancolombia DEBITO",
        valMin: 10000
      },
      {
        id: 2,
        image: "/icons/banks/daviplata.png",
        name: "Daviplata",
        valMin: 0
      },
      {
        id: 3,
        image: "/icons/banks/nequi.png",
        name: "Nequi",
        valMin: 0
      },
      {
        id: 4,
        image: "/icons/banks/pse.png",
        name: "PSE",
        valMin: 40000
      }]
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
    backPay() {
      this.stepPay = 1;
      this.form.payMethodId = null;
    },
    selPayMethod(method) {
      if (this.form.amount < method.valMin) return;
      this.form.payMethodId = method.id;
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
      this.stepPay = 2;
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

.methods {
  border-radius: 1rem;
  overflow: hidden;
  .method-pay {
    background: #fff;
    color: #000;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    .method-image {
      width: 100px;
      img {
        max-width: 80px;
        max-height: 50px;
      }
    }
    .method-name {
      width: 120px;
    }
    .method-value {
      font-size: 12px;
      text-align: right;
      flex: 1;
    }
    &.disabled {
      color: #999;
      filter: grayscale(1);
      img {
        opacity: .5;
      }
    }
    &.active {
      background: #b8e869;
    }
  }
}
</style>

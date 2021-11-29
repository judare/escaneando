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


        <div class="border-custom choose-option active" @click="goToMenu">
          <!-- <img src="/icons/menu.png"> -->
          <div class="box optionable ">
            <div><strong>🍔 Nuestro Menú</strong></div>
            <p>Aquí encontraras todos nuestros productos</p>
          </div>
        </div>

        <div class="border-custom  choose-option active" @click="pay" v-if="visitant.Commerce.paymentsEnabled">
          
          <div class="box optionable">
            <div><strong>💸 Realizar pago</strong></div>
            <p>Procesa el pago de tus compras</p>
          </div>

        </div>

        <div class="border-custom  choose-option active" @click="review">
          <div class="box optionable ">
            <div><strong>💬 Cuentanos tu experiencia</strong></div>
            <p>Escribe aquí una reseña sobre que te piensas</p>
          </div>
        </div>

        <a v-if="visitant.Commerce.facebook" :href="visitant.Commerce.facebook">
          <div class="border-custom  choose-option active">
            <div class="box optionable ">
              <p>Siguenos en facebook</p>
            </div>
          </div>
        </a>
        <a v-if="visitant.Commerce.instagram" :href="visitant.Commerce.instagram">
          <div class="border-custom  choose-option active">
            <div class="box optionable ">
              <p>Siguenos en instagram</p>
            </div>
          </div>
        </a>

      </div>
    </div>


  <app-modal ref="reviewModal">
     <div class="box-form font-light" :class="{ error: !!formErrors.opinion }">

      <div class="text-center">👋🏻   💬   😄</div>
      <h2>¿Qué tal estuvo tu experiencia?</h2>
      <p style="font-size:12px">Cuentanos que tal te parecio nuestro lugar, nuestra comida y todo lo que nos quieras contar! Estamos felices de escucharte!</p>

      <div style="text-align:left">
        <app-star class="mb-2" :stars="5" label="¿Qué tal nuestros productos?" v-model="form.product"/>
        <app-star class="mb-2" :stars="5" label="¿Qué tal nuestra atención?"  v-model="form.attention"/>
        <app-star class="mb-2" :stars="5" label="¿Qué tal nuestros precios?"  v-model="form.prices"/>

        <label class="labelModal" for="inpReview">¿Quieres contarnos un poco más? </label>
        <textarea class="box-input w-100" v-model="form.opinion" id="inpReview">
        </textarea>

        <div class="form-error" v-if="formErrors.opinion">
          {{formErrors.opinion}}
        </div>
      </div>
    </div>

     <div class="box-form">
       <template v-if="!loading">
        <button type="button" class="btn btn-primary w-100" @click="putOpinion">
          Enviar opinión
        </button>
      </template>
      <template v-else>
        <app-loader style="margin: 0 auto;"/>
      </template>
    </div>
  </app-modal>



  <app-modal ref="payModal" v-on:close="backPay">
  
      <div class="text-center" style="text-align: center">👋🏻   💸   💳</div>

      <template v-if="stepPay == 1">
        <div class="box-form" :class="{ error: !!formErrors.amount }">
          <h2>Escribe el valor a pagar</h2>
          <p></p>
          <money inputmode="numeric" thousands='.' :precision="0" prefix="$" class="box-input w-100" v-model="form.amount" id="inpAmount"/>

          <div class="form-error" v-if="formErrors.amount">
            {{formErrors.amount}}
          </div>
        </div>

        <div class="box-form">
          <button type="button" class="btn btn-primary w-100" @click="goToPay" :disabled="form.amount <= 0">
            Continuar el pago
          </button>
        </div>
      </template>
      <template v-else-if="stepPay == 2">
        <div class="box-form" :class="{ error: !!formErrors.amount }">

          <div class="back" @click="backPay()" style="float: left">
            <img src="/icons/back.png">
          </div>

          <h2>Escoge el medio de pago</h2>
          <p></p>

          <ul class="methods">
            <li class="method-pay" v-for="method in methods" :key="method.id" :class="{ disabled: form.amount < method.valMin, active: form.paymentMethodId == method.id }" @click="selPayMethod(method)">
              <div class="method-image">
                <img :src="method.image" alt="">
              </div>
              <div class="method-name">{{method.name}}</div>
              <div class="method-value">Val. min ${{money(method.valMin)}}</div>
            </li>
          </ul>
        </div>

      
        <div class="box-form">
          <button type="button" class="btn btn-primary w-100" @click="goToPayProcess" :disabled="!form.paymentMethodId">
            Continuar
          </button>
        </div>
      </template>

      <template v-else-if="stepPay == 3">
        <div class="box-form" :class="{ error: !!formErrors.amount }">

          <div class="back" @click="backStepPay()" style="float: left">
            <img src="/icons/back.png">
          </div>

          <h2>Completar información</h2>

          <component :is="payComponent" :amount="form.amount"/>
        </div>
      </template>

  </app-modal>

  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppStar from "@/components/AppStar.vue";
import AppModal from "@/components/AppModal.vue";
import { postRequest } from "@/common/api.service.js";
import AppPayDaviplata from "@/components/Pays/Daviplata.vue"
import AppPayNequi from "@/components/Pays/Nequi.vue"
import AppPayPse from "@/components/Pays/Pse.vue"

// @ is an alias to /src
export default {
  name: 'Options',
  computed: {
    ...mapGetters(["config", "visitant"]),
    payComponent() {
      return `app-pay-${this.methodSel.component}`
    }
  },
  data() {
    return {
      formErrors: {},
      form: {
        People: {}
      },
      loading: false,
      stepPay: 1,
      methodSel: null,
      methods: [{
        id: 1,
        image: "/icons/backoffice/banks/bancolombia.svg",
        name: "Bancolombia DEBITO",
        valMin: 10000,
        component: "bancolombia"
      },
      {
        id: 2,
        image: "/icons/backoffice/banks/daviplata.png",
        name: "Daviplata",
        valMin: 0,
        component: "daviplata"
      },
      {
        id: 3,
        image: "/icons/backoffice/banks/nequi.svg",
        name: "Nequi",
        valMin: 0,
        component: "nequi"
      },
      {
        id: 4,
        image: "/icons/banks/pse.png",
        name: "PSE",
        valMin: 40000,
        component: "pse"
      }]
    }
  },
  components: {
    AppModal,
    AppStar,
    AppPayDaviplata,
    AppPayNequi,
    AppPayPse
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
      setTimeout(() => {
        document.getElementById("inpAmount").focus();
      }, 300)
    },
    backPay() {
      this.stepPay = 1;
      this.form.paymentMethodId = null;
    },
    backStepPay() {
      this.stepPay -= 1;
    },
    selPayMethod(method) {
      if (this.form.amount < method.valMin) return;
      this.methodSel = method;
      this.form.paymentMethodId = method.id;
    },
    putOpinion() {
      this.loading = true;
      let data = {
        "review": this.form.opinion,
        "prices": this.form.prices,
        "attention": this.form.attention,
        "product": this.form.product,
        "visitantToken": this.visitant.token,
        "commerce": this.$route.params.slug
      }
      postRequest("visitant/createReview", data).then(result => {
        this.$refs.reviewModal.hide();
        alert("Ok!");
      })
      .finally(() => {
        this.loading = false;
      });
    },
    goToPay() {
      this.stepPay = 2;
    },
    goToPayProcess() {
      this.stepPay = 3;
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
    padding: 10px 5px;
    .method-image {
      width: 70px;
      img {
        max-width: 50px;
        max-height: 50px;
      }
    }
    .method-name {
      width: 120px;
      text-align: left;
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
.form-label {
  text-align: left;
}
.labelModal {
  font-size: 12px;
}
</style>

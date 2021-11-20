<template>
  <div>
    
    <div class="parent md:h-screen md:grid md:grid-cols-6">
      <section class=" lg:col-span-3 md:col-span-2  bg-login bg-no-repeat bg-center bg-cover	bg-right">
        <router-link :to="{ name: 'landing' }" class="p-7 inline-block">
          <img src="/icons/landing/logo.svg"/>
        </router-link>
      </section>
      <main class="main lg:col-span-3 md:col-span-4	">
        
        <div class=" flex md:h-screen md:mt-0 mt-10	flex-row justify-center	items-center	">
          <div class="md:w-6/12 w-10/12">

            <h2 class="mb-4 text-3xl">👋🏻  😄 <br> ¡Hola! <br>
              Bienvenido a Geoda</h2>

            <app-errors ref="errors"/>

            <form v-on:submit.prevent="login">

              <app-input type="number" label="Número de teléfono" placeholder="Celular" class="mb-4" v-model="form.cellphone"/>  

              <app-input type="password" label="Contraseña" placeholder="**********" class="mb-6" v-model="form.password"/>  
          
          
              <div class="">

                <app-button variant="primary" class="mb-3" type="submit"> 
                  Iniciar Sesión
                </app-button>
                <div class="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" @click="forgot">
                  Olvidaste la contraseña?
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>


    <app-modal ref="forgotPassword" position="bottom" title="Recuperar contraseña">
      <app-errors ref="errorsRecover"/>

      <div class="mb-5">
        <app-input type="email" label="Correo" placeholder="Correo" v-model="form.email" /> 
      </div>
      <app-button variant="primary"  @click="recoverPassword"> 
        Recuperar contraseña
      </app-button> 
    </app-modal>


  </div>
</template>

<script>
import { postRequest } from "@/common/api.service.js";

export default {
  name: "Login",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    login() {
      this.$refs.errors.clear();
      postRequest("auth/login", this.form).then(result => {
        this.$store.commit("setUser", result.data.User)
        this.$router.replace({ name: "backoffice-home" });
      })
      .catch(err => {
        this.$refs.errors.put(err.message);
      });
    },
    forgot() {
      this.$refs.forgotPassword.show()
    },
    recoverPassword() {
      this.$refs.errorsRecover.clear();

      postRequest("auth/forgotPassword", this.form).then(result => {
        this.$refs.forgotPassword.hide();
        this.form = {};
      })
      .catch(err => {
        this.$refs.errorsRecover.put(err.message);
      });
    }
  }
}
</script>
<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");
.bg-login {
  background-image: url(/icons/login.svg)
}
@media (max-width: 800px) {
  .bg-login {
    background-image: none;
  }
}
</style>
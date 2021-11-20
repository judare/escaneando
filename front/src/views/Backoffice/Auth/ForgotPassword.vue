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

            <h2 class="mb-4 text-3xl">👋🏻  😄 <br> Uyyy! <br>
             Recupera tu contraseña</h2>

            <app-errors ref="errors"/>

            <app-input v-model="form.password" type="password" label="Contraseña" placeholder="**********" class="mb-6"/> 

            <app-input v-model="form.confirmPassword" type="password" label="Repetir contraseña" placeholder="**********" class="mb-6"/>
        
            <div class="">

              <app-button variant="primary" class="mb-3" @click="done"> 
                Cambiar contraseña
              </app-button>

            </div>
          </div>
        </div>
      </main>
    </div>

    <app-modal title="Contraseña cambiada con éxito" ref="doneProcess" position="bottom">
      <p class="mb-5 font-light">Ahora puedes usar tu cuenta con la contraseña que acabas de asociar, puedes ir directamente al inicio de sesión pulsando el boton de abajo.</p>
      <app-button variant="primary" @click="goToLogin">Ir al login</app-button>
    </app-modal>

  </div>
</template>

<script>
import { postRequest } from "@/common/api.service.js";

export default {
  name: "ForgotPassword",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    done() {
      this.$refs.errors.clear();
      if (this.form.confirmPassword != this.form.password) {
        return this.$refs.errors.put("Las contraseñas no coinciden");
      }
      if (!this.form.password || this.form.password.length < 6) {
        return this.$refs.errors.put("La contraseña debe tener mas de 6 carácter");
      }

      let data = {
        restoreToken: this.$route.params.restoreToken,
        userId: this.$route.params.userId,
        password: this.form.password
      }
      postRequest("auth/restorePassword", data).then(result => {
        this.form = {};
        this.$refs.doneProcess.show();
      })
      .catch(err => {
        this.$refs.errors.put(err.message);
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
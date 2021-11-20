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

            <app-input type="password" label="Contraseña" placeholder="**********" class="mb-6"/> 

            <app-input type="password" label="Repetir contraseña" placeholder="**********" class="mb-6"/>
        
            <div class="">

              <app-button variant="primary" class="mb-3" @click="done"> 
                Cambiar contraseña
              </app-button>

            </div>
          </div>
        </div>
      </main>
    </div>


  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  methods: {
    done() {

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
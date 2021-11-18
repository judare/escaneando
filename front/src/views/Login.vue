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
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Número de teléfono
              </label>
              <input class="appearance-none bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Celular">
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Contraseña
              </label>
              <input class=" appearance-none bg-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            </div>
            <div class="">
              <button class="bg-primary text-black py-2 px-4 rounded-full focus:outline-none focus:shadow-outline font-light w-100 mb-3 hover:bg-black" type="button" @click="login">
                Iniciar Sesión
              </button>
              <a class="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Olvidaste la contraseña?
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>


  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {

    }
  }
}
</script>
<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");
.bg-login {
  background-image: url(/icons/login.svg)
}
.bg-primary {
  background-image:linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%);
}
@media (max-width: 800px) {
  .bg-login {
    background-image: none;
  }
}
</style>
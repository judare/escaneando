<template>
<div class="landing">




  <nav class="flex items-center justify-between flex-wrap py-10 container  mx-auto">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img src="/icons/landing/logo.svg" alt="">
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="w-full font-light block flex-grow lg:flex lg:items-center lg:w-auto text-center mt-10 lg:mt-0">
      <div class="text-sm lg:flex-grow">
        <a href="#about" class="block mt-4 lg:inline-block lg:mt-0 hover:text-green-600 mr-4">
          ¿Quiénes somos?
        </a>
        <a href="#offer" class="block mt-4 lg:inline-block lg:mt-0 hover:text-green-600 mr-4">
          ¿Qué te ofrecemos?
        </a>
      </div>
      <div>
        <router-link class="inline-block  text-black py-2 px-4  md:w-44 text-center mt-10 lg:mt-0" :to="{ name: 'login' }">Iniciar sesión</router-link>
        <a class="inline-block bg-black hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full md:w-44 text-center mt-10 lg:mt-0" href="#register">Regístrate</a>
      </div>
    </div>
  </nav>


  <!-- <div class="bg-indigo-900 text-center py-4 lg:px-4">
    <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
      <span class="font-semibold mr-2 text-left flex-auto">Get the coolest t-shirts from our brand new store</span>
      <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
    </div>
  </div> -->


  <div class="section-page mb-20">
    <div class="section-1 container mx-auto bg-center sm:bg-none bg-no-repeat text-center md:text-right">
      
    
      <div class="right-float-section">
        <h2>Haz <span class="text-degree">crecer</span> tu <br> negocio con nuestra <br> plataforma gratuita</h2>
      </div>
    </div>
  </div>



  <div class="section-page my-20" id="about">
    <div class="container mx-auto">
      <div class="md:grid md:grid-cols-12 md:gap-6">
        
        <div class="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6 aos-init aos-animate font-light	">
          <p>
            Geoda es la plataforma pionera en implementar data de una manera eficiente, optima y sencilla.  Utilizamos inteligencia artificial y datos para sacar insgihts relevantes para tu empresa. <br><br>
            Crece tu negocio con nosotros recolectando e implementando datos de una forma inteligente.
          </p>
          <a class="inline-block bg-black hover:bg-green-600 text-white md:w-6/12 text-center py-2 px-4 my-10 rounded-full" href="#register">Vive la experiencia</a>
        </div>

        <div class="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 aos-init aos-animate">
          <img src="/icons/landing/section-2.svg">
        </div>
      </div>
    </div>
  </div>



  <div class="section-page my-20 section-3 bg-no-repeat bg-right" id="offer">
    <div class="container mx-auto">
      <div class="md:grid md:grid-cols-12 md:gap-6">

        
        <div class="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6 aos-init aos-animate">
          <h2 class="mb-5">Herramienta <br>  todo en uno</h2>

          <ul class="pretty-list font-light	">
            <li>Recolecta datos de tus clientes con solo un click: obteniendo el teléfono.</li>

            <li>Recibe pagos digitales: Usa nuestra propia pasarela de pagos con tasa de cobro menor al resto y al datáfono.</li>

            <li>Automatiza campañas de Marketing móvil: envía mensajes personalizados a tus clientes más fieles o menos recurrentes, ¡Tú decides!</li>

            <li>Identifica las mejores oportunidades: hazle seguimiento a tus clientes y toma decisiones inteligentes para tu negocio basada en datos.</li>

            <li>Entérate que piensan tus clientes de tu negocio: obtén retroalimentación a través de reseñas y comentarios de tus clientes.</li>

            <li>Aloja tu portafolio en nuestra plataforma: evita descargas innecesarias de PDF´s.</li>

          </ul>
          

        </div>

      </div>
    </div>
  </div>

  <div class="section-page my-20">
    <div class="container mx-auto">
      <div class="items-features font-light">
        <div class="box-feature box-decoration right">
          En geoda sabemos la importancia y el potencial de los datos para el crecimiento de las empresas, por eso, a través de nuestra plataforma gratuita impulsamos a las empresas, comercios y microcomercios.
        </div>

        <div class="box-feature box-decoration style-2 ">
          Nos preocupamos por el crecimiento de las empresas ofreciendo desarrollo tecnológico adaptable para todo tipo de industria, nos adaptamos a ti.
        </div>

        <div class="box-feature box-decoration style-3 right">
          Aplicamos las principales áreas tecnológicas para el crecimiento de tu negocio: marketing basado en datos, desarrollo de Software y diseño UX/UI
        </div>
      </div>
    </div>

  </div>

  <div class="section-page-preview mb-5">

    <div class="container mx-auto block direction-column">
      <h2 class="mb-5">Funcionalidades</h2>

      <div class="w-full block flex-grow lg:flex lg:items-center lg:justify-center lg:w-auto text-center">
        <img src="/icons/landing/show-1.png" class="hidden md:block">
        <!-- <img src="/icons/landing/show-2.png"> -->
        <img src="/icons/landing/show-4.png" class="">
        <img src="/icons/landing/show-3.png" class="hidden md:block">
      </div>
      
    </div>
  </div>


  <div class="section-page">
    <div class="container mx-auto">
      <div class="items-features font-light	">
        <div class="box-feature box-decoration style-small right">
          <strong>Evita descargas innecesarias de tu carta.</strong> Agiliza la visualización de tu menú con la funcionalidad vista previa.
        </div>

        <div class="box-feature box-decoration style-small style-2">
          <strong>¿Prefieres modo dark o light?</strong>
          <br>  Escoge el modo que prefieras con solo un click.
        </div>

        <div class="box-feature box-decoration style-small right style-3">
          <strong>¿Quieres saber que piensan los clientes de tu negocio?</strong> Entérate por medio de una reseña.
        </div>
      </div>
    </div>
  </div>





  <div class="section-page my-20" id="register">

    <div class="container  mx-auto font-light">
      <h2 class="mb-5">Regístrate</h2>

      <p class="mb-10">¡Permitenos conocerte y que nos conozcas!</p>

      <div class="block register">
     
        <div class="mb-5">
          <span>Hola, Mi nombre es </span>
          <input type="text" class="input-inline" placeholder="Escribe aquí">
          <span>pertenezco a la empresa</span>
          <input type="text" class="input-inline" placeholder="Escribe aquí">
          podemos estar en contacto, a través del email
          <input type="text" class="input-inline" placeholder="Escribe aquí"> o el número de teléfono 
          <input type="text" class="input-inline" placeholder="Escribe aquí">
        </div>

        <div class="mb-5">
          <label>
            <input type="checkbox" class="form-checkbox mr-5">
            <span>Autorizo el uso de la información</span>
          </label>
        </div>
        <button class="text-base inline-block bg-black hover:bg-green-600 text-white  py-2 px-4 rounded-full md:w-5/12">Continuar con el registro</button>

      </div>




      
    </div>
  </div>




  <div class="footer mt-10 font-light">
    <div class="container mx-auto py-10 ">
      <div class="w-100 flex-grow md:flex md:items-center md:justify-center">
        

        <div class="flex flex-grow block text-left">
          <div class="mr-5">
            <img src="/icons/landing/logo-footer.svg" alt="">
          </div>
          <ul >
            <li>Geoda {{(new Date).getFullYear()}}</li>
            <li>Todos los derechos reservados</li>
          </ul>
        </div>
        <div class="flex flex-grow block text-left">
          <ul>
            <li>Contacto</li>
            <li>Política de privacidad</li>
          </ul>
        </div>

        <div class="flex flex-grow block text-center">
          <div class="block">
            <div class="inline-block mr-2.5 social-network"><img src="/icons/landing/social/fb.svg" alt=""></div>
            <div class="inline-block mr-2.5 social-network"><img src="/icons/landing/social/yt.svg" alt=""></div>
            <div class="inline-block social-network"><img src="/icons/landing/social/lk.svg" alt=""></div>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "Landing"
}
</script>
<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");

.landing {
  h2 {
    font-size: 3.3rem;
    line-height: 1;
    font-weight: 700;
  }
  .text-degree {
    background: linear-gradient(45deg, #8a2ec0, #6950e6 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .pretty-list {
    li {
      position: relative;
      padding-left: 40px;
      margin-bottom: 20px;
      &:after {
        content: "";
        top: 0;
        left: 0;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100px;
        border: 3px solid transparent;
        background: linear-gradient(90deg, rgba(187, 236, 105, 0.9) 0.01%, rgba(155, 207, 173, 0.9) 49.15%, rgba(69, 93, 209, 0.9) 98.29%) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
      }
    }
  }

  .section-page {
 
    .section-1 {
      background-image: url(/icons/landing/section-1.1.svg);
      background-size: 100%;
      height: 522px;
    }
    &.section-3 {
      background-image: url(/icons/landing/section-3.svg);
    }
  }

  .footer .container {
    border-top: 2px solid #000000;
  }
  .box-decoration {
    position: relative;
    padding-left: 50px;
    max-width: 600px;
    margin-top: 40px;
    margin-bottom: 40px;
    &.right {
      margin-left: auto;
    }
    &:before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0;
      bottom: 0;
      width: 42px;
      height: 42px;
      border-radius: 8px;
      border: 3px solid transparent;
      background: linear-gradient(180deg, rgba(43, 86, 240, 0.9) 0%, #900bcfe6 99.24%) border-box;
      -webkit-mask:linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; /*5'*/
      mask-composite: exclude;
    }

    &.style-2:before {
      background: linear-gradient(180deg, rgba(249, 239, 91, 0.9) 7.75%, rgba(191, 240, 103, 0.9) 82.81%) border-box; 
    }
    
    &.style-3:before {
      background: linear-gradient(90deg, rgba(187, 236, 105, 0.9) 0.01%, rgba(155, 207, 173, 0.9) 49.15%, rgba(69, 93, 209, 0.9) 98.29%) border-box;
    } 
    &.style-small {
      padding-left: 30px;
      &:before {
        top: -15px;
        left: -5px;
        width: 20px;
      }
    }
  }

  .register {
    font-size: 20px;
    line-height: 2;
  }
  .input-inline {
    border: none;
    border-bottom: 2px solid #BBEC69;
    width: 250px;
    font-size: 19px;
    text-align: center;
    padding: 0 10px;
    font-weight: 300;
    &:hover, &:active, &:focus {
      border-bottom: 2px solid #455DD1;
      outline: none;
    }
  }
}

@media (max-width: 800px) {
  .section-page {
    .section-1 {
      background: none!important;
      height: auto!important;
    }
    &.section-3 {
      background-image: none!important;
    }
  }
}
@media (min-width: 1123px) {
  .container {
    max-width: 1123px!important;
  }
}

</style>
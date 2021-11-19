<template>
 <div>
   <div v-if="menuExpand" class="fixed top-10 left-5 cursor-pointer">
     <img src="/icons/logo-backoffice.svg" alt=""  @click="toggleMenu">
   </div>
  <div  :class="{ 'md:pl-20 pl-5': menuExpand }">
    <div class="parent md:grid md:grid-cols-12">
      <transition name="fade">
        <section v-show="!menuExpand || (menuExpand && showMenu)" class="sidebar   rounded-l-none md:rounded-3xl	text-black custom-border active p-10 lg:col-span-3 col-span-4  bg-white z-20" :class="{ 'fixed h-screen top-0 left-0': menuExpand }" >
          <img src="/icons/logo-backoffice.svg" alt="">

          <ul class="menu mt-10 font-light">

            <li class="p-5"><router-link :to="{ name: 'backoffice-home' }">🏠 Inicio</router-link></li>
            <li class="p-5"><router-link :to="{ name: 'backoffice-customers' }">😍 Clientes</router-link></li>
            <li class="p-5"><router-link :to="{ name: 'backoffice-reports' }">💸 Transacciones</router-link></li>
            <li class="p-5"><router-link :to="{ name: 'backoffice-products' }">🍽 Productos</router-link></li>
            <li class="p-5"><router-link :to="{ name: 'backoffice-config' }">⚙️ Configuración</router-link></li>

            

            <li class="p-5"><div @click="closeSession">👌🏼 Cerrar sesión</div></li>
          </ul>
        </section>
      </transition>
      <main class="main pt-10" :class="{ 'menu-expand col-span-12': menuExpand, 'lg:col-span-9 col-span-8': !menuExpand }" @click="clickOutside">

        <div  class="mb-5">
          <img v-if="menuExpand" src="/icons/menu.svg" @click="toggleMenu" class="inline-block align-middle mr-5 cursor-pointer">
          <h2 class="font-light text-xl inline-block align-middle" :class="{ 'md:pl-5': !menuExpand }">{{$route.meta.title}}</h2>
        </div>
        
        <div class="md:pl-5">
          <slot :toggle="toggleMenu"></slot>
        </div>
      </main>
    </div>

    <div class="mt-5 p-5 text-gray-600 font-light">
      Geoda - Todos los derechos reservados
    </div>

      
  </div>
 </div>
</template>
<script>
export default {
  name: "backoffice-layout",
  data() {
    return {
      showMenu: false,
      menuExpand: false,
      canClose: false
    }
  },
  mounted() {
    this.menuExpand = this.$route.meta.menuExpand;
  },
  methods: {
    toggleMenu() {
      this.canClose = false;
      this.showMenu = !this.showMenu;
      setTimeout(() => {
        this.canClose = true;
      }, 300);
    },
    closeSession() {
      this.$router.replace({ name: "landing" })
    },
    clickOutside() {
      if (this.menuExpand && this.showMenu && this.canClose) this.showMenu = false; 
    }
  },
  watch: {
    "$route"(to) {
      this.menuExpand = this.$route.meta.menuExpand;
    }
  }
}
</script>
<style lang="scss" >

.custom-border {
  position: relative;
  &:before {
    border-radius: 1rem;
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: -1;
    border: 2px solid transparent; /*2*/
    background: #EFECEC;
    -webkit-mask: /*4*/
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; /*5'*/
    mask-composite: exclude; /*5*/
  }
  &.active {
    &:before {
      background:linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%) border-box; /*3*/    
    }
  }
  &.rounded-l-none {
    &:before {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &.rounded-r-none {
    &:before {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
.bg-primary {
  background-image:linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%);
}
</style>
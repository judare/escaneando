<template>
 <div>
   <div v-if="menuExpand" class="fixed top-10 left-5 cursor-pointer">
     <img src="/icons/logo-backoffice.svg" alt=""  @click="toggleMenu">
   </div>
  <div  :class="{ 'md:pl-20 pl-5': menuExpand }">
    <div class="parent md:grid md:grid-cols-12">
      <transition name="slide-fade">
        <section v-show="!menuExpand || (menuExpand && showMenu)" class="sidebar   rounded-l-none md:rounded-3xl	text-black custom-border active lg:col-span-3 col-span-4  bg-white z-20" :class="{ 'fixed h-screen top-0 left-0': menuExpand }" >
          <div class="p-10">
            <img src="/icons/logo-backoffice.svg" alt="">

            <ul class="menu mt-10 font-light">

              <li class="p-5"><router-link :to="{ name: 'backoffice-home' }">🏠 Inicio</router-link></li>
              <li class="p-5"><router-link :to="{ name: 'backoffice-customers' }">😍 Clientes</router-link></li>
              <li class="p-5"><router-link :to="{ name: 'backoffice-reports' }">💸 Transacciones</router-link></li>
              <li class="p-5"><router-link :to="{ name: 'backoffice-products' }">🍽 Productos</router-link></li>
              <li class="p-5"><router-link :to="{ name: 'backoffice-config' }">⚙️ Configuración</router-link></li>

              

              <li class="p-5"><div @click="closeSession" class="cursor-pointer">👌🏼 Cerrar sesión</div></li>
            </ul>
          </div>
        </section>
      </transition>
      <main class="main pt-10" :class="{ 'menu-expand col-span-12': menuExpand, 'lg:col-span-9 col-span-8': !menuExpand }" @click="clickOutside">

        <div  class="mb-5">
          <img v-if="menuExpand" src="/icons/menu.svg" @click="toggleMenu" class="inline-block align-middle mr-5 cursor-pointer">
          <h2 class="font-light text-xl inline-block align-middle" :class="{ 'md:pl-5': !menuExpand }">{{$route.meta.title}}</h2>
        </div>
        
        <div class="md:pl-5" style="min-height: 100vh">
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
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";

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
    this.getCommerces();
  },
  methods: {
    getCommerces() {
      postRequest("commerces/list", {}, this.user).then(result => {
        this.$store.commit("setCommerces", result.data.Commerces);
      });
    },
    toggleMenu() {
      this.canClose = false;
      this.showMenu = !this.showMenu;
      setTimeout(() => {
        this.canClose = true;
      }, 300);
    },
    closeSession() {
      postRequest("auth/logout", {}, this.user).then(result => {
        this.$router.replace({ name: "landing" })
      });
    },
    clickOutside() {
      if (this.menuExpand && this.showMenu && this.canClose) this.showMenu = false; 
    }
  },
  computed: {
    ...mapGetters(["user"])
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
  // background: white;
  border: 0px transparent;
  border-radius: .8rem;
  background-origin: border-box;
  background-clip: content-box, border-box;
  padding: 2px;
  display:block;
  &.gray {
    background-image: linear-gradient(#fff, #fff), linear-gradient(#ddd, #ddd);
  }
  &.active {
    background-image: linear-gradient(#fff,#fff ), radial-gradient(circle at top left, #BBEC69,#455DD1);
  }
  .box.sm {
    padding: 3px 15px;
  }
}


.custom-border2 {
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
.custom-border-table {
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    content: "";
    display:block;
    background: linear-gradient(89.98deg, #BBEC69 1.1%, rgba(155, 207, 173, 0.495063) 48.6%, #455DD1 95.16%);
  }
}
.slide-fade-enter-active {
  transition: all .1s;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}
</style>
<template>
<div class="backoffice-content">

  <div class="md:grid md:grid-cols-12 pr-10">

    <section class="	text-black m-3 col-span-7 "  >
      
      <router-link v-if="commerce.slug" :to="{ name: 'main', params: { slug: commerce.slug } }" class="float-right" target="_blank">🖇️ Ver mi sitio</router-link>
      
      <h2 class="text-4xl mb-5">¡Bienvenido!</h2>

      <div>
        <div class="percent-tasks  cursor-pointer text-right" @click="openTasks">
          <span class="text-3xl font-medium">{{Math.floor(tasks.percent)}}%</span>
          <div class="font-medium">avance en tu perfil</div>
          <p class="font-light">Click aquí para ver detalles</p>
        </div>
      </div>

      <h2 class="mb-3 text-xl ">ConseGeos ✌🏼</h2>
      <div class="custom-border active mb-5" v-for="x in [1]" :key="x">
        <div class="p-5 " >
          <p>¡Recuerdales cuanto extrañas a tus clientes! <br>
          <span class="font-light">Visita el apartado clientes en la sección de recurrencias y audita sus visitas!</span></p> 
        </div>
      </div>

      

    </section>

    <main class="main  m-3  col-span-5 rounded-3xl">
      <img src="/icons/backoffice/promo.svg" alt="">
    </main>
  </div>

  <app-modal ref="taskModal" title="Avance del comercio">

    <p class="mb-5 font-light">Verifica la lista de acciones y completa tu perfil para obtener todos los beneficios que te ofrecemos.</p>
    <ul class="font-light">
      <li class="mb-3" v-for="task in tasks.Tasks" :key="task.id">
        <template v-if="task.done">✅</template>
        <template v-else>☹️</template>
         {{task.name}}</li>
    </ul>
  </app-modal>

</div>
</template>

<script>
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";

export default {
  name: 'Home',
  props: ["layoutProps"],
  data() {
    return {
      tasks: {}
    }
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      if (!this.commerce.id) return;
      postRequest("users/tasks", {}, this.user).then(result => {
        this.tasks = result.data;
      });
    },
    openTasks() {
      this.$refs.taskModal.show();
    },
  },
  computed: {
    ...mapGetters(["commerce", "user"])
  },
  watch: {
    commerce() {
      this.getTasks();
    }
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css");


</style>

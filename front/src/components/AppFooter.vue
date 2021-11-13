<template>

  <div class="footer">
    <div @click="reload">Todos los derechos reservados</div>
  </div>
</template>
<script>
export default {
  name: "app-footer",
  methods: {
    reload() {
      window.location.reload(true);
    }
  }
}
</script>

<style lang="scss">
.footer {
  margin-top: 20px;
  text-align: center;;
  padding: 20px;
  border-top: 1px solid rgba(0,0,0,0.3);
}
</style>
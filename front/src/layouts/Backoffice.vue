<template>
  <div>

    <div class="parent md:h-screen md:grid md:grid-cols-6">
      <section class="sidebar bg-blue-400  md:col-span-1">Sidebar</section>
      <main class="main md:col-span-5">
        <slot></slot>
      </main>
    </div>

    
  </div>
</template>
<script>
export default {
  name: "backoffice-layout"
}
</script>
<style lang="scss" >

</style>
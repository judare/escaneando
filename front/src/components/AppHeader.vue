<template>
  <div class="header">
    <div class="back" @click="back">
      <img src="/icons/back.svg">

    </div>
    <div class="logo">
      <img src="https://olaclick.s3.amazonaws.com/companies/logos/cba9cbba-a3b6-4522-b4f0-eb9ddd51b2c1.JPG" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "app-header",
  methods: {
    back() {
      this.$router.push({ name: "options" });
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 10px;
  .back {
    width: 60px;
    cursor: pointer;
    text-align: center;
  }
  
  .logo {
    img {
      border-radius: 1rem;
      max-height: 100px;
      max-width: 200px;
    }
  }
}

</style>
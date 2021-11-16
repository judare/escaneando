<template>
  <div class="header">
    <div class="back" @click="back">
      <img src="/icons/back.png">
    </div>
    <div class="logo" v-if="visitant && visitant.Commerce">
      <img :src="visitant.Commerce.logo" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "app-header",
  methods: {
    back() {
      this.$router.push({ name: "options", params: { slug: this.$route.params.slug } });
    }
  },
  computed: {
    ...mapGetters(["visitant"])
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
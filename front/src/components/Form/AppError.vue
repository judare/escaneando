<template>
<div class="bg-red-500 text-center py-4 lg:px-4 rounded-xl mb-10" v-if="formErrors.length > 0" >
  <div class="p-2 bg-red-400 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex m-2" v-for="(err, index) in formErrors" :key="index">
    <span class="flex rounded-full bg-red-700 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
    <span class="font-semibold mr-2 text-left flex-auto">{{err}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "app-errors",
  data() {
    return {
      formErrors: []
    }
  },
  methods: {
    clear() {
      this.formErrors = [];
    },
    put(err) {
      this.formErrors.push(err);
    },
    hasErrors() {
      return this.formErrors.length > 0;
    }
  }
}
</script>
<style lang="scss">
</style>
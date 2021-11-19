<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="id">
      {{label}}
    </label>

    <template v-if="type == 'select'">
      <select class="appearance-none bg-gray-200 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="id" :placeholder="label">
        <slot></slot>
      </select>
    </template>
    <template v-else-if="type == 'textarea'">
      <textarea class="appearance-none bg-gray-200 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="id" :placeholder="label"/>
    </template>
    <template v-else>
      <input class="appearance-none bg-gray-200 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :type="type" :id="id" :placeholder="label">
    </template>
  </div>
</template>
<script>
export default {
  name: "app-input",
  props: [ "label", "type" ],
  data() {
    return {
      id: ""
    }
  },
  mounted() {
    this.id = "e" + Date.now().toString().substr(-7);
  }
}
</script>
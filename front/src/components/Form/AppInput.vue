<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-light mb-2" :for="id">
      {{label}}
    </label>

    <template v-if="type == 'select'">

      <select :value="modelValue" @input="change" class="appearance-none bg-gray-200 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="id" >
        <slot></slot>
      </select>
    </template>
    <template v-else-if="type == 'textarea'">
      <textarea :value="modelValue" @input="change" class="appearance-none bg-gray-200 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="id" :placeholder="label"/>
    </template>
    <template v-else>
      <input :value="modelValue" @input="change" class="appearance-none bg-gray-200 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :type="type" :id="id" :placeholder="label">
    </template>
  </div>
</template>
<script>
export default {
  name: "app-input",
  props: {
    label: { type: String, required: false },
    type: { type: String, required: false, default: "text" },
    placeholder: { type: String, required: false },
    modelValue: { required: false },
    extraClass: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    name: { type: String, required: false, default: null }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      id: "",
    }
  },
  mounted() {
    this.id = "e" + Date.now().toString().substr(-7);
  },
  methods: {
    change(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
<template>
  <div>
    <label class="block text-gray-700 text-sm font-light mb-2"  v-if="label">
      {{label}}
    </label>

    <div class="p-3 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
        class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
    
      <label for="assetsFieldHandle" class="block cursor-pointer">
        <div class="text-center font-light text-sm">
          <p>Arrastra las imagenes aquí o <span class="font-medium">click aquí para buscar</span>  </p>
          <p class="text-xs">Hasta 15 fotos de tu producto</p>
        </div>
      </label>
      
    </div>
    <ul class="mt-4" v-if="this.filelist.length" v-cloak>
      <li class="text-sm p-1" v-for="(file, i) in filelist" :key="i">
        <span class="font-light">{{ file.name }}</span>
        
        <button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">
         <img src="/icons/close.svg">
        </button>
      </li>
    </ul>

  </div>


</template>

<script>
export default {
  name: "app-drag-file",
  props: ["label"],
  data() {
    return {
    filelist: [] // Store our uploaded files
    }
  },
  methods: {
    onChange() {
      this.filelist = [...this.filelist, ...this.$refs.file.files];
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }
  }
}
</script>
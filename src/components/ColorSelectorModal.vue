<!-- ColorSelectorModal.vue 
    A modal for selecting a color. 
-->
<script setup lang="ts">

import { defineProps, defineEmits, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    colors?: string[]; // Optional prop
  }>(),
  {
    colors: ()=> [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-orange-500",
        "bg-teal-500",
        "bg-indigo-500"
    ]
  }
);

const emit = defineEmits<{
  (event: "colorSelected", color: string): void;
  (event: "close"): void;
}>();

const selectColor = (color: string) => {
  emit("colorSelected", color);
  emit("close"); // Close the modal after selection
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-xl font-semibold mb-4">Select a Color</h2>

      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="color in props.colors"
          :key="color"
          @click="selectColor(color)"
          class="w-10 h-10 rounded-lg border transition hover:scale-110"
          :class="[color, 'border-gray-300 hover:border-black']"
        ></button>
      </div>

      <div class="flex justify-end mt-4">
        <button @click="emit('close')" class="px-4 py-2 border rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

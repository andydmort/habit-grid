<!-- ColorSelectorModal.vue 
    A modal for selecting a color. 
-->
<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from "vue";
import BaseModal from "./BaseModal.vue";

const props = withDefaults(
  defineProps<{
    colors?: string[]; // Optional prop
  }>(),
  {
    colors: () => [
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
  emit("close");
};
</script>

<template>
  <BaseModal title="Select a Color" width="w-80" @close="emit('close')" :zIndex="80">
    <div class="grid grid-cols-4 gap-2">
      <button
        v-for="color in props.colors"
        :key="color"
        @click="selectColor(color)"
        class="w-10 h-10 rounded-lg border transition hover:scale-110"
        :class="[color, 'border-gray-300 hover:border-black']"
      ></button>
    </div>
  </BaseModal>
</template>

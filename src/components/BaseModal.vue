<!-- BaseModal.vue -->

<script setup lang="ts">

import { defineProps, defineEmits } from "vue";

withDefaults(
  defineProps<{
    title: string;
    width?: string;
  }>(),
  {
    width: "w-96",
  }
);

const emit = defineEmits<{
  (event: "close"): void;
}>();

</script>



<template>

  <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 z-50 p-5">

    <div :class="['bg-white p-6 rounded-lg shadow-lg', width]">

      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

      

      <!-- Content slot -->

      <slot></slot>

      

      <!-- Footer slot with default -->

      <slot name="footer">

        <div class="flex justify-end space-x-2 mt-4">

          <button @click="emit('close')" class="px-4 py-2 border rounded">

            Cancel

          </button>

          <slot name="primary-action"></slot>

        </div>

      </slot>

    </div>

  </div>

</template> 
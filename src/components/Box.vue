<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

withDefaults(defineProps<{
  color?: string;
}>(), {color: "bg-blue-500"});

const emit = defineEmits(['clicked']);

const handleClick = () => {
  emit('clicked');
};
</script>

<template>
  <div
    class="w-7 h-7 justify-center cursor-pointer rounded-sm "
    :class="color"
    @click="handleClick"
  >
  </div>
</template>

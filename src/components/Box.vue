<script setup lang="ts">

const props = withDefaults(defineProps<{
  color?: string;
}>(), {color: "bg-blue-500"});

const emit = defineEmits(['clicked']);

const handleClick = () => {
  emit('clicked');
};
</script>

<template>
  <div
    class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 justify-center cursor-pointer rounded-sm transition-all duration-200 hover:scale-110"
    :class="props.color"
    @click="handleClick"
  >
  </div>
</template>

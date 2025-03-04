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
    class="w-7 h-7 justify-center cursor-pointer rounded-sm "
    :class="props.color"
    @click="handleClick"
  >
  </div>
</template>

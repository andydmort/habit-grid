<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  goals: string[];
}>();

const emit = defineEmits<{
  (event: "goalSelected", goal: string): void;
}>();

const currentIndex = ref(0);

// Compute current goal based on index
const currentGoal = computed(() => props.goals[currentIndex.value] || "No Goals");

// Move to previous goal
const prevGoal = () => {
  if (props.goals.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + props.goals.length) % props.goals.length;
  emit("goalSelected", currentGoal.value);
};

// Move to next goal
const nextGoal = () => {
  if (props.goals.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.goals.length;
  emit("goalSelected", currentGoal.value);
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <!-- Left Arrow -->
    <button @click="prevGoal" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <-
    </button>

    <!-- Goal Name -->
    <div class="text-lg font-semibold min-w-[150px] text-center">
      {{ currentGoal }}
    </div>

    <!-- Right Arrow -->
    <button @click="nextGoal" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        ->
    </button>
  </div>
</template>

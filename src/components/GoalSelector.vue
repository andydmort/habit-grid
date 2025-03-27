<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  goals: string[];
  descriptions: string[];
}>();

const emit = defineEmits<{
  (event: "goalSelected", goal: string): void;
}>();

const currentIndex = ref(0);

// Compute current goal based on index
const currentGoal = computed(() => props.goals[currentIndex.value] || "No Goals");

// Get current description
const currentDescription = computed(() => {
  if (props.goals.length === 0) return "";
  return props.descriptions[currentIndex.value] || "";
});

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
  <div class="flex flex-col items-center">
    <div class="flex items-center space-x-4">
      <!-- Left Arrow -->
      <button 
        @click="prevGoal" 
        class="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none"
        :disabled="props.goals.length === 0"
        :class="{ 'opacity-50 cursor-not-allowed': props.goals.length === 0 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Goal Name -->
      <div class="flex flex-col items-center min-w-[200px]">
        <div class="text-lg font-medium text-gray-800 text-center">
          {{ currentGoal }}
        </div>
        <div v-if="currentDescription" class="text-sm text-gray-500 mt-1 text-center">
          {{ currentDescription }}
        </div>
      </div>

      <!-- Right Arrow -->
      <button 
        @click="nextGoal" 
        class="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none"
        :disabled="props.goals.length === 0"
        :class="{ 'opacity-50 cursor-not-allowed': props.goals.length === 0 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

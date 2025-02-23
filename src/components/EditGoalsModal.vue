<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from "vue";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "goalCreated", goal: string): void;
  (event: "goalRemoved", goal: string): void;
}>();

const props = defineProps<{
  goals: string[];
}>();

const newGoal = ref("");
const goals = ref<string[]>([]);

watch(() => props.goals, (newGoals) => {
  goals.value = [...newGoals];
}, { immediate: true });

// Handle submitting the new goal
const submitGoal = () => {
  if (newGoal.value.trim() === "") return;
  goals.value.push(newGoal.value.trim());
  emit("goalCreated", newGoal.value.trim());
  newGoal.value = "";
};

// Handle removing a goal
const removeGoal = (goal: string) => {
  goals.value = goals.value.filter(g => g !== goal);
  emit("goalRemoved", goal);
};

// Close modal
const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Edit Goals</h2>

      <input
        v-model="newGoal"
        type="text"
        placeholder="Enter goal name"
        class="w-full p-2 border rounded"
      />

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="closeModal" class="px-4 py-2 border rounded">
          Cancel
        </button>
        <button @click="submitGoal" class="px-4 py-2 bg-blue-500 text-white rounded">
          Add Goal
        </button>
      </div>

      <ul class="mt-4">
        <li v-for="goal in goals" :key="goal" class="flex justify-between items-center p-2 border-b">
          {{ goal }}
          <button @click="removeGoal(goal)" class="px-2 py-1 bg-red-500 text-white rounded">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

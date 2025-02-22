<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps<{
  goals: string[]; // List of existing goals
}>();

const emit = defineEmits<{
  (event: "select", goal: string): void;
  (event: "addGoal", goal: string): void;
}>();

const showInput = ref(false);
const newGoal = ref("");

// Handle selecting an existing goal
const selectGoal = (goal: string) => {
  emit("select", goal);
};

// Handle adding a new goal
const addGoal = () => {
  if (newGoal.value.trim() === "") return;
  emit("addGoal", newGoal.value.trim());
  newGoal.value = "";
  showInput.value = false;
};
</script>

<template>
  <div class="relative inline-block text-left">
    <div class="border rounded px-4 py-2 cursor-pointer bg-gray-100">
      <select class="bg-transparent outline-none" @change="selectGoal($event.target.value)">
        <option disabled selected>Select a goal</option>
        <option v-for="goal in goals" :key="goal" :value="goal">
          {{ goal }}
        </option>
        <option disabled>──────────</option>
        <option value="add-new">➕ Add New Goal</option>
      </select>
    </div>

    <div v-if="showInput" class="mt-2 flex space-x-2">
      <input
        v-model="newGoal"
        type="text"
        placeholder="Enter new goal"
        class="border rounded px-2 py-1 w-full"
      />
      <button @click="addGoal" class="bg-blue-500 text-white px-4 py-1 rounded">
        Add
      </button>
    </div>
  </div>
</template>

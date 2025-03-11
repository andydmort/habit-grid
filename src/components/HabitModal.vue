<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import type { HabitDB } from "../HabitDB.ts";
import BaseModal from "./BaseModal.vue";

const props = defineProps<{
  day: string; // Selected day in YYYY-MM-DD format
  habitDB: HabitDB;
}>();

const emit = defineEmits(["close"]); // Emits an event to close the modal
const habits = ref<string[]>([]);
const newHabit = ref("");

// Load habits when `day` changes
watch(() => props.day, async () => {
  const record = await props.habitDB.getRecordByDate(props.day);
  habits.value = record?.achievedGoals || [];
}, { immediate: true });

// Add a new habit to the list
const addHabit = () => {
  if (newHabit.value.trim() === "") return;
  habits.value.push(newHabit.value.trim());
  newHabit.value = "";
};

// Remove a habit from the list
const removeHabit = (index: number) => {
  habits.value.splice(index, 1);
};

// Save habits and close the modal
const saveAndClose = async () => {
  await props.habitDB.addRecord({ date: props.day, achievedGoals: habits.value });
  emit("close");
};
</script>

<template>
  <BaseModal :title="`Edit Habits for ${day}`" @close="emit('close')">
    <div class="space-y-2">
      <ul>
        <li v-for="(habit, index) in habits" :key="index" 
            class="p-2 border rounded bg-gray-200 flex justify-between items-center">
          <span>{{ habit }}</span>
          <button @click="removeHabit(index)" 
                  class="text-red-500 hover:text-red-700 px-2">
            ✕
          </button>
        </li>
      </ul>
      
      <input
        v-model="newHabit"
        placeholder="Add a new habit"
        class="w-full p-2 border rounded"
      />
      <button @click="addHabit" class="w-full bg-blue-500 text-white py-2 rounded mt-2">
        Add Habit
      </button>
    </div>

    <template #primary-action>
      <button @click="saveAndClose" class="px-4 py-2 bg-green-500 text-white rounded">
        Save
      </button>
    </template>
  </BaseModal>
</template>

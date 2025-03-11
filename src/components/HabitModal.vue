<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import type { HabitDB, GoalRecord } from "../HabitDB.ts";
import BaseModal from "./BaseModal.vue";

const props = defineProps<{
  day: string; // Selected day in YYYY-MM-DD format
  habitDB: HabitDB;
}>();

const emit = defineEmits(["close"]); // Emits an event to close the modal
const checkedHabits = ref<string[]>([]);
const availableGoals = ref<GoalRecord[]>([]);

// Load habits and goals when `day` changes
watch(() => props.day, async () => {
  const [record, goals] = await Promise.all([
    props.habitDB.getRecordByDate(props.day),
    props.habitDB.getGoals()
  ]);
  checkedHabits.value = record?.achievedGoals || [];
  availableGoals.value = goals;
}, { immediate: true });

// Toggle a habit's checked state
const toggleHabit = (goalTitle: string) => {
  const index = checkedHabits.value.indexOf(goalTitle);
  if (index === -1) {
    checkedHabits.value.push(goalTitle);
  } else {
    checkedHabits.value.splice(index, 1);
  }
};

// Save habits and close the modal
const saveAndClose = async () => {
  await props.habitDB.addRecord({ date: props.day, achievedGoals: checkedHabits.value });
  emit("close");
};
</script>

<template>
  <BaseModal :title="`Edit Habits for ${day}`" @close="emit('close')">
    <div class="space-y-2">
      <div v-if="availableGoals.length === 0" class="text-gray-500 text-center py-4">
        No goals available. Please add some goals first.
      </div>
      <ul class="space-y-2">
        <li v-for="goal in availableGoals" 
            :key="goal.title" 
            class="p-3 border rounded hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
            @click="toggleHabit(goal.title)">
          <div class="flex-shrink-0">
            <div class="w-6 h-6 border-2 rounded flex items-center justify-center"
                 :class="[checkedHabits.includes(goal.title) ? goal.color + ' border-transparent' : 'border-gray-300']">
              <svg v-if="checkedHabits.includes(goal.title)" 
                   class="w-4 h-4 text-white" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div class="flex-grow">
            <div class="font-medium">{{ goal.title }}</div>
            <div v-if="goal.description" class="text-sm text-gray-500">{{ goal.description }}</div>
          </div>
        </li>
      </ul>
    </div>

    <template #primary-action>
      <button @click="saveAndClose" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted } from "vue";
import type { GoalRecord, HabitDB } from "../HabitDB";
import GoalEditor from "./GoalEditor.vue";
import BaseModal from "./BaseModal.vue";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "goalCreated", goal: string): void;
  (event: "goalRemoved", goal: string): void;
}>();

const props = defineProps<{
  habitDB: HabitDB
}>();

// Handle submitting the new goal
const newGoal = ref("");
const submitGoal = () => {
  if (newGoal.value.trim() === "") return;
  props.habitDB.addOrEditGoal({ 
    title: newGoal.value.trim(), 
    color: "bg-blue-500", 
    description: "" 
  });
};

// Handle removing a goal
const removeGoal = (goal: GoalRecord) => {
  props.habitDB.removeGoal(goal.title);
};

// Handle Close modal
const closeModal = () => {
  emit("close");
};

// Editing Goals
const goalToEdit = ref<GoalRecord>();
const goalEditorOpen = ref(false);
const openGoalEditor = (goal: GoalRecord) => {
  goalToEdit.value = goal;
  goalEditorOpen.value = true;
};
const closeGoalEditor = () => {
  goalEditorOpen.value = false;
};

// Handle updating a goal
const updateGoal = (updatedGoal: GoalRecord) => {
  props.habitDB.addOrEditGoal(updatedGoal);
  closeGoalEditor();
};

const goals = ref<GoalRecord[]>([]);
onMounted(async () => {
  let fetchedGoals = await props.habitDB.getGoals()
  goals.value = fetchedGoals;
  props.habitDB.addOnDbChange(async ()=>{
    let fetchedGoals = await props.habitDB.getGoals()
    goals.value = fetchedGoals;
  });
});
</script>

<template>
  <GoalEditor 
    v-if="goalEditorOpen"
    :goal="goalToEdit!" 
    @update="updateGoal"
    @close="closeGoalEditor"
  />
  <BaseModal title="Edit Goals" @close="closeModal" :zIndex="40">
    <input
      v-model="newGoal"
      type="text"
      placeholder="Enter goal name"
      class="w-full p-2 border rounded"
    />

    <div class="flex justify-end space-x-2 mt-4">
      <button @click="submitGoal" class="px-4 py-2 bg-blue-500 text-white rounded">
        Add Goal
      </button>
    </div>

    <ul class="mt-4">
      <li v-for="goal in goals" :key="goal.title" class="flex justify-between items-center p-2 border-b">
        {{ goal.title }}
        <div class="flex gap-2">
          <button
            class="px-2 py-1 bg-green-500 text-white rounded" 
            @click="openGoalEditor(goal)"
          > 
            Edit 
          </button>
          <button @click="removeGoal(goal)" class="px-2 py-1 bg-red-500 text-white rounded">
            Remove
          </button>
        </div>
      </li>
    </ul>
  </BaseModal>
</template>

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

// Track changes in the current session
const sessionGoals = ref<GoalRecord[]>([]);
const newGoal = ref("");

// Load initial goals
onMounted(async () => {
  const fetchedGoals = await props.habitDB.getGoals();
  sessionGoals.value = JSON.parse(JSON.stringify(fetchedGoals)); // Deep copy to avoid reference issues
});

// Handle submitting the new goal
const submitGoal = () => {
  if (newGoal.value.trim() === "") return;
  sessionGoals.value.push({ 
    title: newGoal.value.trim(), 
    color: "bg-blue-500", 
    description: "" 
  });
  newGoal.value = "";
};

// Handle removing a goal in the session
const removeGoal = (goal: GoalRecord) => {
  sessionGoals.value = sessionGoals.value.filter(g => g.title !== goal.title);
};

// Save all changes and close modal
const saveChanges = async () => {
  // Get current goals to compare
  const currentGoals = await props.habitDB.getGoals();
  
  // Remove goals that are no longer in session
  for (const goal of currentGoals) {
    if (!sessionGoals.value.find(g => g.title === goal.title)) {
      await props.habitDB.removeGoal(goal.title);
    }
  }
  
  // Add or update goals from session
  for (const goal of sessionGoals.value) {
    await props.habitDB.addOrEditGoal(goal);
  }
  
  emit("close");
};

// Handle Close modal - discard changes
const closeModal = () => {
  emit("close");
};

// Editing Goals
const goalToEdit = ref<GoalRecord>({
  title: "",
  color: "bg-blue-500",
  description: ""
});
const goalEditorOpen = ref(false);
const openGoalEditor = (goal: GoalRecord) => {
  goalToEdit.value = { ...goal }; // Create copy to avoid reference issues
    goalEditorOpen.value = true;
};
const closeGoalEditor = () => {
  goalEditorOpen.value = false;
};

// Handle updating a goal in the session
const updateGoal = (updatedGoal: GoalRecord) => {
  const index = sessionGoals.value.findIndex(g => g.title === goalToEdit.value?.title);
  if (index !== -1) {
    sessionGoals.value[index] = updatedGoal;
  }
  closeGoalEditor();
};
</script>

<template>
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
      <li v-for="goal in sessionGoals" :key="goal.title" class="flex justify-between items-center p-2 border-b">
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

    <template #primary-action>
      <button @click="saveChanges" class="px-4 py-2 bg-green-500 text-white rounded">
        Save Changes
      </button>
    </template>
  </BaseModal>
  
  <!-- Move the GoalEditor outside and after the BaseModal -->
  <GoalEditor 
    v-if="goalEditorOpen"
    :goal="goalToEdit" 
    @update="updateGoal"
    @close="closeGoalEditor"
  />
</template>

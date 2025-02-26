<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WeeksOfDateBoxes from './components/WeeksOfDateBoxes.vue';
import HabitModal from './components/HabitModal.vue';
import { HabitDBBrowserStorage } from './HabitDBBrowserStorage';
import GoalSelector from "./components/GoalSelector.vue";
import EditGoalsModal from "./components/EditGoalsModal.vue";
import type { GoalRecord } from './HabitDB';

// Load the habit storage that will be passed and shared by all components.
const habitStorage = ref<HabitDBBrowserStorage>(new HabitDBBrowserStorage());

const selectedDay = ref<string | null>(null);
const selectedGoal = ref<GoalRecord>({title: '', color: '', description: ''});

const onDayClicked = (day: string)=>{
  selectedDay.value = day;
}

const onCloseModal = ()=>{
  selectedDay.value = null;
}


const showCreateGoalModal = ref(false);
const goals = ref<GoalRecord[]>([]);

const loadGoals = async () => {
  goals.value = await habitStorage.value.getGoals();
};

const handleGoalSelect = (goalTitle: string) => {
  // Find the goal record based on the title
  let goal = goals.value.find(g=>g.title === goalTitle);
  selectedGoal.value = goal ?? {title: '', color: '', description: ''};
};

// const handleGoalCreated = async (goal: string) => {
//   loadGoals();
//   showCreateGoalModal.value = false;
// };

// const handleGoalRemoved = async (goal: string) => {
//   await habitStorage.value.removeGoal(goal);
//   loadGoals();
// };

const onGoalsEdited = async () => {
  await loadGoals();
  selectedGoal.value = goals.value ? goals.value[0] : {title: '', color: '', description: ''};
  showCreateGoalModal.value = false;
};

// Get first day of current month
const startDate = new Date();
const startDateStr = startDate.toISOString().split('T')[0];


onMounted(async () => {
  onGoalsEdited();
});

</script>

<template>
  <div class="flex flex-col items-center p-4">
    <button 
      class="mt-4 px-4 py-2 bg-gray-500 text-white rounded self-end"
      @click="showCreateGoalModal = true"
    >
    Edit Goals
    </button>

    <GoalSelector 
      class="py-4"
      :goals="goals.map(g=>g.title)" 
      @goalSelected="handleGoalSelect"
    />
    
    <WeeksOfDateBoxes
      :start-date="startDateStr"
      :num-weeks="10"
      :habitDB="habitStorage"
      :color="selectedGoal.color"
      unfullfilled-color="bg-gray-500"
      :selected-goal="selectedGoal.title"
      @day-clicked="onDayClicked"
    />

    <HabitModal
      v-if="selectedDay" 
      :day="selectedDay"
      :habitDB="habitStorage"
      @close="onCloseModal"
    />
    
    <EditGoalsModal
      v-if="showCreateGoalModal"
      :habit-d-b="habitStorage"
      @close="onGoalsEdited"
    />
  </div>
</template>

<style scoped>
</style>

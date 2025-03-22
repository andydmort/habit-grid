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
const selectedGoal = ref<GoalRecord>({title: '', color: 'bg-blue-500', description: ''});

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
  selectedGoal.value = goal ?? {title: '', color: 'bg-blue-500', description: ''};
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
  selectedGoal.value = goals.value ? goals.value[0] : {title: '', color: 'bg-blue-500', description: ''};
  showCreateGoalModal.value = false;
};

// Get first day of current month
const startDate = new Date();
const startDateStr = startDate.toLocaleDateString('en-CA');

// Function to handle quick check-off for today
const quickCheckToday = async () => {
  const today = new Date().toLocaleDateString('en-CA');
  selectedDay.value = today;
};

onMounted(async () => {
  onGoalsEdited();
});

</script>

<template>
  <div class="flex flex-col items-center p-4 max-w-4xl mx-auto my-2 border border-gray-200 rounded-lg shadow-sm min-h-[90vh] w-[95%] sm:w-[90%]">
    <div class="w-full flex justify-end mb-6">
      <button 
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors shadow-sm"
        @click="showCreateGoalModal = true"
      >
        Edit Goals
      </button>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center gap-4">
      <GoalSelector 
        class="py-4"
        :goals="goals.map(g=>g.title)" 
        @goalSelected="handleGoalSelect"
      />
      
      <WeeksOfDateBoxes
        :start-date="startDateStr"
        :num-weeks="10"
        :habitDB="habitStorage"
        :color="selectedGoal?.color"
        unfullfilled-color="bg-gray-500"
        :selected-goal="selectedGoal?.title"
        @day-clicked="onDayClicked"
      />

      <!-- Quick check-off button -->
      <button 
        class="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
        @click="quickCheckToday"
      >
        I did it!
      </button>
    </div>

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
/* Add any additional custom styles here */
</style>

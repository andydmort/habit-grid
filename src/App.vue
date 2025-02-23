<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WeeksOfDateBoxes from './components/WeeksOfDateBoxes.vue';
import HabitModal from './components/HabitModal.vue';
import { HabitDBBrowserStorage } from './HabitDBBrowserStorage';
import GoalSelector from "./components/GoalSelector.vue";
import EditGoalsModal from "./components/EditGoalsModal.vue";

const habitStorage = ref<HabitDBBrowserStorage>(new HabitDBBrowserStorage());
const selectedDay = ref<string | null>(null);
const selectedGoal = ref<string | null>("");

const onDayClicked = (day: string)=>{
  selectedDay.value = day;
}

const onCloseModal = ()=>{
  selectedDay.value = null;
}

const showCreateGoalModal = ref(false);
const goals = ref<string[]>([]);

const loadGoals = async () => {
  goals.value = await habitStorage.value.getGoals();
};

const handleGoalSelect = (goal: string) => {
  if (goal === "add-new") {
    showCreateGoalModal.value = true;
    return;
  } else {
    selectedGoal.value = goal;
    console.log(`Selected goal: ${goal}`);
  }
};

const handleGoalCreated = async (goal: string) => {
  await habitStorage.value.addGoal(goal);
  loadGoals();
  showCreateGoalModal.value = false;
};

const handleGoalRemoved = async (goal: string) => {
  await habitStorage.value.removeGoal(goal);
  loadGoals();
};

onMounted(() => {
  loadGoals();
  selectedGoal.value = goals.value ? goals.value[0] : null;
});

// Get first day of current month
const startDate = new Date();
startDate.setDate(1);
const startDateStr = startDate.toISOString().split('T')[0];

</script>

<template>
  <div class="p-4">
    <GoalSelector 
      class="py-4"
      :goals="goals" 
      @goalSelected="handleGoalSelect"
    />
    
    <WeeksOfDateBoxes
      :start-date="startDateStr"
      :num-weeks="5"
      :habitDB="habitStorage"
      color="bg-blue-500"
      unfullfilled-color="bg-gray-500"
      :selected-goal="selectedGoal ?? ''"
      @day-clicked="onDayClicked"
    />

    <button @click="showCreateGoalModal = true" class="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
      Settings
    </button>

    <HabitModal
      v-if="selectedDay" 
      :day="selectedDay"
      :habitDB="habitStorage"
      @close="onCloseModal"
    />
    
    <EditGoalsModal
      v-if="showCreateGoalModal"
      :goals="goals"
      @close="showCreateGoalModal = false"
      @goalCreated="handleGoalCreated"
      @goalRemoved="handleGoalRemoved"
    />
  </div>
</template>

<style scoped>
</style>

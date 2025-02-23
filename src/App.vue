<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Box from './components/Box.vue';
import Week from './components/Week.vue';
import HabitModal from './components/HabitModal.vue';
import { HabitDBBrowserStorage } from './HabitDBBrowserStorage';
import GoalSelector from "./components/GoalSelector.vue";
import EditGoalsModal from "./components/EditGoalsModal.vue";

const handleBoxClick = ()=>{
  console.log("clicked on box");
};

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

</script>

<template>
  <div class="p-4">

    <GoalSelector 
      class="py-4"
      :goals="goals" 
      @goalSelected="handleGoalSelect"
    />
    <Week
      :habitDB="habitStorage"
      color="bg-blue-500" 
      :habit="selectedGoal ?? ''"
      :startDate="new Date('2023-01-01')"
      :endDate="new Date('2023-01-07')"
      @day-clicked="onDayClicked"
    />
    <br>
    <Week
      :habitDB="habitStorage"
      color="bg-blue-500" 
      :habit="selectedGoal ?? ''"
      :startDate="new Date('2023-01-08')"
      :endDate="new Date('2023-01-14')"
      @day-clicked="onDayClicked"
    />
    <br>
    <Week
      :habitDB="habitStorage"
      color="bg-blue-500" 
      :habit="selectedGoal ?? ''"
      :startDate="new Date('2023-01-15')"
      :endDate="new Date('2023-01-21')"
      @day-clicked="onDayClicked"
    />
    <br>
    <Week
      :habitDB="habitStorage"
      :habit="selectedGoal ?? ''"
      color="bg-blue-500" 
      :startDate="new Date('2023-01-22')"
      :endDate="new Date('2023-01-28')"
      @day-clicked="onDayClicked"
    />
    <br>
    <Week
      :habitDB="habitStorage"
      :habit="selectedGoal ?? ''"
      color="bg-blue-500" 
      :startDate="new Date('2023-01-29')"
      :endDate="new Date('2023-02-04')"
      @day-clicked="onDayClicked"
    />
    
  </div>
  <button @click="showCreateGoalModal = true" class="px-4 py-2 bg-gray-500 text-white rounded">
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
</template>

<style scoped>
</style>

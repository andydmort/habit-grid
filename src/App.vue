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
  <p class="font-bold underline">stuff and stuff</p>
  <Box
    @clicked="handleBoxClick" 
  />
  <GoalSelector 
    :goals="goals" 
    @goalSelected="handleGoalSelect"
  />
  <Week
    :habitDB=habitStorage
    color="bg-blue-500" 
    habit="stuff"
    @day-clicked="onDayClicked"
  />
  <br>
  <Week
    :habitDB=habitStorage
    color="bg-blue-500" 
    habit="eating"
  />
  <br>
  <Week
    :habitDB=habitStorage
    color="bg-blue-500" 
    habit="eating"
  />
  <br>
  <Week
    :habitDB=habitStorage
    color="bg-blue-500" 
    habit="eating"
  />
  <br>
  <Week
    :habitDB=habitStorage
    color="bg-blue-500" 
    habit="eating"
  />

  <HabitModal
    v-if="selectedDay" 
    :day="selectedDay"
    :habitDB="habitStorage"
    @close="onCloseModal"
  />
  <button @click="showCreateGoalModal = true" class="px-4 py-2 bg-gray-500 text-white rounded">
    Settings
  </button>
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

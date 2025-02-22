<script setup lang="ts">
import { ref } from 'vue';
import Box from './components/Box.vue';
import Week from './components/Week.vue';
import HabitModal from './components/HabitModal.vue';
import { HabitDBBrowserStorage } from './HabitDBBrowserStorage';
import GoalDropdown from "./components/GoalDropDown.vue";


const handleBoxClick = ()=>{
  console.log("clicked on box");
};

const habitStorage = ref<HabitDBBrowserStorage>(new HabitDBBrowserStorage());
const selectedDay = ref<string | null>(null);

const onDayClicked = (day: string)=>{
  selectedDay.value = day;
}

const onCloseModal = ()=>{
  selectedDay.value = null;
}

</script>

<template>
  <p class="font-bold underline">stuff and stuff</p>
  <Box
    @clicked="handleBoxClick" 
  />
  <GoalDropdown :goals="['one', 'two']" />
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
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref } from 'vue';
import Box from './components/Box.vue';
import Week from './components/Week.vue';
import { HabitDBBrowserStorage } from './HabitDBBrowserStorage';

const handleBoxClick = ()=>{
  console.log("clicked on box");
};

const habitStorage = ref<HabitDBBrowserStorage>(new HabitDBBrowserStorage());

</script>

<template>
  <p class="font-bold underline">stuff and stuff</p>
  <Box
    @clicked="handleBoxClick" 
  />
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
  <br>
  <Week
    :habitDB=habitStorage
    color="bg-blue-500" 
    habit="eating"
  />
</template>

<style scoped>
</style>

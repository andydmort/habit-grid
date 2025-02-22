<script setup lang="ts">
/**
 * Week.vue
 */
import { ref, onMounted, computed } from "vue";
import Box from './Box.vue';
import type { HabitDB, HabitRecord } from "../HabitDB.ts"

const props = defineProps<{
  color: string; // Tailwind color (e.g., "blue-500")
  habit: string; // The habit to track (e.g., "Exercise")
  habitDB: HabitDB;
  mondayDate?: Date; // The date for Monday in the week. This represents the start of the week.
}>();

const emit = defineEmits<{
  "day-clicked": [value: string]
}>();


const tracker = props.habitDB;
const weekDays = ref<string[]>([]);
const habitsForWeek = ref<Array<HabitRecord>>([]);

// Get the start of the current week (Monday)
const getWeekStartDate = (): Date => {
  const today = props.mondayDate ?? new Date();
  return today;
};

// Generate a week's dates
const loadWeekDays = () => {
  const start = getWeekStartDate();
  weekDays.value = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  });
};

// Load the habit records for the week
const loadWeekHabits = async () => {
  const [start, end] = [weekDays.value[0], weekDays.value[6]];
  habitsForWeek.value = await tracker.getRecordsByDateRange(start, end);
};

const datesAndHabits = computed(()=>{
  let rtn: Array<{day: string, habitComplete: boolean}> = [];
  weekDays.value.forEach((weekDay)=>{
    const record = habitsForWeek.value.find((r) => r.date === weekDay);
    rtn.push({
      day: weekDay,
      habitComplete: record?.achievedGoals.includes(props.habit) || false
    });
  });
  return rtn;
});


// Load data when component is mounted
onMounted(() => {
  loadWeekDays();
  loadWeekHabits();
  props.habitDB.addOnDbChange(()=>{
    loadWeekHabits();
  });
});

const boxClicked = (day: string)=>{
  emit('day-clicked', day);
};

</script>

<template>
  <div class="flex gap-2">
    <div v-for="day in datesAndHabits" :key="JSON.stringify(day)" class="text-center">
      <!-- <div class="text-xs text-gray-600">{{ day }}</div> -->
      <Box
        :color="day.habitComplete ? props.color : 'bg-gray-500'"
        @clicked="boxClicked(day.day)"
      />
    </div>
  </div>
</template>

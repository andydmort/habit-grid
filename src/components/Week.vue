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
  startDate: Date; // The start date of the range
  endDate: Date; // The end date of the range
}>();

const emit = defineEmits<{
  "day-clicked": [value: string]
}>();

const tracker = props.habitDB;
const weekDays = ref<string[]>([]);
const habitsForWeek = ref<Array<HabitRecord>>([]);

// Generate dates for the given range
const loadWeekDays = () => {
  const start = props.startDate;
  const end = props.endDate;
  const dates = [];
  let currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split("T")[0]); // YYYY-MM-DD format
    currentDate.setDate(currentDate.getDate() + 1);
  }
  weekDays.value = dates;
};

// Load the habit records for the range
const loadWeekHabits = async () => {
  const [start, end] = [weekDays.value[0], weekDays.value[weekDays.value.length - 1]];
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

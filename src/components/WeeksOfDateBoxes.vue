<!-- WeeksOfDateBoxes.vue 
    This component displays a grid of DateBoxes for a number of weeks. 
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { HabitDB } from '../HabitDB';
import DateBox from './DateBox.vue';


const props = withDefaults(defineProps<{
    startDate: string; // Start date in YYYY-MM-DD format. Note: We will always use the entire week that includes the start date.
    numWeeks: number; // Number of weeks to display.
    habitDB: HabitDB; // Database to query for the goals
    color?: string; // Color to show if goal is completed. This should be a tailwind background color.
    unfullfilledColor?: string; // (Optional) Color to show if goal is not completed. This should be a tailwind background color.
    selectedGoal: string; // Goal to query for the passed date.
}>(), {color: "bg-blue-500", unfullfilledColor: "bg-gray-200"});

const emit = defineEmits<{
    "day-clicked": [value: string]  // emits the date when a box is clicked.
}>();


const weeks = computed<string[][]>(()=>{
    const weeks = [];
    const startDate = new Date(props.startDate);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Move to the start of the week
    for (let i = props.numWeeks - 1; i >= 0; i--) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() - i * 7 + j);
            week.push(date.toLocaleDateString('en-CA')); // Format as YYYY-MM-DD in local time
        }
        weeks.push(week);
    }
    return weeks;
});

</script>

<template>
    <div class="flex flex-col items-center w-full max-w-[600px] mx-auto gap-1 sm:gap-2">
        <div v-for="(week) in weeks" :key="JSON.stringify(week)" class="flex gap-1 sm:gap-2 justify-center">
            <DateBox 
                v-for="(date) in week" 
                :key="date" 
                :date="date" 
                :currentGoal="props.selectedGoal" 
                :color="props.color" 
                :unfullfilledColor="props.unfullfilledColor" 
                :habitDB="props.habitDB" 
                @clicked="emit('day-clicked', date)"
            />
        </div>
    </div>
</template>
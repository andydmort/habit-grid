<!-- WeeksOfDateBoxes.vue 
    This component displays a grid of DateBoxes for a number of weeks. 
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { HabitDB } from '../HabitDB';
import DateBox from './DateBox.vue';


const props = defineProps<{
    startDate: string; // Start date in YYYY-MM-DD format. Note: We will always use the entire week that includes the start date.
    numWeeks: number; // Number of weeks to display.
    habitDB: HabitDB; // Database to query for the goals
    color?: string; // Color to show if goal is completed. This should be a tailwind background color.
    unfullfilledColor?: string; // (Optional) Color to show if goal is not completed. This should be a tailwind background color.
    selectedGoal: string; // Goal to query for the passed date.
}>();

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
            week.push(date.toISOString().split('T')[0]);
        }
        weeks.push(week);
    }
    return weeks;
});

</script>

<template>
    <div>
        <div v-for="(week) in weeks" :key="JSON.stringify(week)" class="flex gap-2 my-2">
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
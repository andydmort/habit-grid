<!-- DateBox.vue
    Reative box that reads database and displays color according to goals completed. 
 -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { HabitDB } from '../HabitDB';
import Box from './Box.vue';

const props = withDefaults(defineProps<{
    currentGoal: string; // goal to query for the passed date.
    color?: string; // Color to show if goal is completed. This should be a tailwind background color.
    unfullfilledColor?: string; // Color to show if goal is not completed. This should be a tailwind background color.
    futureColor?: string; // Color to show if the date is in the future. This should be a tailwind background color.
    date: string; // date in YYYY-MM-DD format for this box.
    habitDB: HabitDB; // Database to query for the goals.
}>(), {
    color: 'bg-blue-500',
    unfullfilledColor: 'bg-gray-500',
    futureColor: 'bg-gray-200'
});
const emit = defineEmits<{
    clicked: [string]  // emits the date when the box is clicked.
}>();


const currentGoalsForDate = ref<string[]>([]);

let afterToday = computed<boolean>(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return props.date > todayStr; // Simple string comparison of YYYY-MM-DD format
});

let shouldBeColored = computed<boolean>(()=>{
    return currentGoalsForDate.value.includes(props.currentGoal);
});

const loadCurrentGoals = async ()=>{
    const record = await props.habitDB.getRecordByDate(props.date);
    currentGoalsForDate.value = record?.achievedGoals || [];
};

onMounted(async ()=>{
    loadCurrentGoals();
    props.habitDB.addOnDbChange(loadCurrentGoals);
});

onUnmounted(()=>{
    props.habitDB.removeOnDbChange(loadCurrentGoals);
});

</script>

<template>
    <Box 
        :color="afterToday ? futureColor : (shouldBeColored ? props.color : unfullfilledColor)" 
        @clicked="emit('clicked', props.date)" 
    />
</template>
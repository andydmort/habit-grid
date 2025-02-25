<script setup lang="ts">
import { ref } from 'vue';
import type { GoalRecord } from '../HabitDB';
import ColorSelectorModal from './ColorSelectorModal.vue';

const props = defineProps<{
  goal: GoalRecord;
}>();

const emit = defineEmits<{
  (event: 'update', goal: GoalRecord): void;
  (event: 'remove', title: string): void;
}>();

const isColorModalOpen = ref(false);
const editedGoal = ref({ ...props.goal });

const updateColor = (newColor: string) => {
  editedGoal.value.color = newColor;
  emit('update', editedGoal.value);
};

const updateGoal = () => {
  emit('update', editedGoal.value);
};
</script>

<template>
  <div class="border rounded p-4 mb-2">
    <div class="flex gap-4 mb-2">
      <input
        v-model="editedGoal.title"
        @change="updateGoal"
        type="text"
        placeholder="Goal title"
        class="flex-grow p-2 border rounded"
      />
      <button
        @click="isColorModalOpen = true"
        class="w-10 h-10 rounded"
        :class="editedGoal.color"
      />
      <button
        @click="emit('remove', goal.title)"
        class="px-2 py-1 bg-red-500 text-white rounded"
      >
        Remove
      </button>
    </div>
    <textarea
      v-model="editedGoal.description"
      @change="updateGoal"
      placeholder="Goal description"
      class="w-full p-2 border rounded"
      rows="2"
    />
    <ColorSelectorModal
      v-if="isColorModalOpen"
      @close="isColorModalOpen = false"
      @colorSelected="updateColor"
    />
  </div>
</template>

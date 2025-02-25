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
  (event: 'close'): void;
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

const closeEditor = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Edit Goal</h2>
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
        </div>
        <textarea
          v-model="editedGoal.description"
          @change="updateGoal"
          placeholder="Goal description"
          class="w-full p-2 border rounded"
          rows="2"
        />
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="closeEditor" class="px-4 py-2 border rounded">
            Cancel
          </button>
          <button @click="updateGoal" class="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
      <ColorSelectorModal
        v-if="isColorModalOpen"
        @close="isColorModalOpen = false"
        @colorSelected="updateColor"
      />
    </div>
  </div>
</template>

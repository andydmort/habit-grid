<script setup lang="ts">
import { ref } from 'vue';
import type { GoalRecord } from '../HabitDB';
import ColorSelectorModal from './ColorSelectorModal.vue';
import BaseModal from './BaseModal.vue';

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
};

const updateGoal = () => {
  emit('update', editedGoal.value);
  emit('close');
};

const closeEditor = () => {
  emit('close');
};
</script>

<template>
  <BaseModal title="Edit Goal" @close="closeEditor" :zIndex="60">
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
    </div>

    <template #primary-action>
      <button @click="updateGoal" class="px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </template>
  </BaseModal>

  <ColorSelectorModal
    v-if="isColorModalOpen"
    @close="isColorModalOpen = false"
    @colorSelected="updateColor"
  />
</template>

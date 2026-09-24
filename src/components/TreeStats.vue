<template>
  <div class="tree-stats">
    <div class="counter-badge">
      <span class="counter-icon">🌱</span>
      <span class="counter-text">
        <span :key="store.totalLeaves" class="counter-num">{{ store.totalLeaves }}</span>
        Kebaikan Telah Ditanam
      </span>
    </div>

    <div class="level-info">
      <div class="level-header">
        <span class="level-chip">Level {{ store.treeLevel }}</span>
        <span class="level-name">{{ store.treeLevelName }}</span>
      </div>
      <div v-if="store.treeLevel < 5" class="progress-wrapper">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: store.progressToNext + '%' }"
          ></div>
        </div>
        <span class="progress-label">
          {{ store.progressToNext }}% menuju {{ nextLevelName }}
        </span>
      </div>
      <div v-else class="max-level">
        ✨ Pohon Kebaikan telah mencapai level tertinggi!
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTreeStore } from '../stores/tree.js'

const store = useTreeStore()

const LEVEL_NAMES = ['Bibit', 'Pohon Kecil', 'Pohon Sedang', 'Pohon Rimbun', 'Pohon Kebaikan']
const nextLevelName = computed(() => LEVEL_NAMES[store.treeLevel] || '')
</script>

<style scoped>
.tree-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.counter-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.75);
  border: 1.5px solid var(--green-300);
  border-radius: var(--radius-full);
  padding: 10px 24px;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-sm);
}

.counter-icon {
  font-size: 1.3rem;
  animation: float 3s ease-in-out infinite;
}

.counter-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--green-800);
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.counter-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--green-700);
  display: inline-block;
  animation: countUp 0.4s var(--spring) both;
  min-width: 1.5ch;
  text-align: center;
}

.level-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--green-200);
  border-radius: var(--radius-lg);
  padding: 14px 28px;
  backdrop-filter: blur(6px);
  min-width: 280px;
}

.level-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.level-chip {
  background: var(--green-700);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.level-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--green-900);
}

.progress-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.progress-bar {
  width: 100%;
  max-width: 240px;
  height: 6px;
  background: var(--green-200);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green-600), var(--green-500));
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.max-level {
  font-size: 0.85rem;
  color: var(--green-700);
  font-weight: 600;
}
</style>

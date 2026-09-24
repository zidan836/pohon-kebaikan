<template>
  <div class="app">
    <Navbar @open-modal="showModal = true" />

    <main>
      <HeroSection @open-modal="showModal = true" />

      <section class="tree-section">
        <div class="section-inner">
          <TreeStats />
          <VirtualTree />
          <div class="plant-cta">
            <button class="btn-plant" @click="showModal = true">
              🌱 Tanam Kebaikanmu
            </button>
            <p class="plant-hint">Klik daun pada pohon untuk membaca komitmen</p>
          </div>
        </div>
      </section>
    </main>

    <Footer />

    <AddCommitmentModal v-model="showModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar              from './components/Navbar.vue'
import HeroSection         from './components/HeroSection.vue'
import TreeStats           from './components/TreeStats.vue'
import VirtualTree         from './components/VirtualTree.vue'
import AddCommitmentModal  from './components/AddCommitmentModal.vue'
import Footer              from './components/Footer.vue'

const showModal = ref(false)
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.tree-section {
  padding: 0 16px 24px;
}

.section-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plant-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.btn-plant {
  background: var(--green-700);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 20px rgba(64, 145, 108, 0.38), 0 1px 0 rgba(255,255,255,0.15) inset;
  transition: background var(--transition), transform var(--spring), box-shadow var(--transition);
  animation: pulse 3s ease-in-out infinite;
}

.btn-plant:hover {
  background: var(--green-800);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(64, 145, 108, 0.5);
  animation: none;
}

.btn-plant:active {
  transform: translateY(0);
}

.plant-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>

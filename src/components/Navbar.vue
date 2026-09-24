<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="navbar-inner">
      <div class="navbar-brand">
        <span class="brand-icon">🌳</span>
        <span class="brand-name">Pohon Kebaikan</span>
      </div>
      <div class="navbar-links">
        <a href="#tentang" class="nav-link">Tentang</a>
        <button class="nav-cta" @click="$emit('openModal')">
          🌱 Tanam Kebaikan
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['openModal'])

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background var(--transition-slow), box-shadow var(--transition-slow), backdrop-filter var(--transition-slow);
}

.navbar.scrolled {
  background: rgba(255, 253, 245, 0.88);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(27, 67, 50, 0.08), var(--shadow-sm);
}

.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-icon {
  font-size: 24px;
  line-height: 1;
  animation: float 4s ease-in-out infinite;
}

.brand-name {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--green-900);
  letter-spacing: -0.01em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}

.nav-link:hover {
  color: var(--green-700);
}

.nav-cta {
  background: var(--green-700);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 8px rgba(64, 145, 108, 0.35);
  transition: background var(--transition), transform var(--spring), box-shadow var(--transition);
}

.nav-cta:hover {
  background: var(--green-800);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(64, 145, 108, 0.45);
}

.nav-cta:active {
  transform: translateY(0);
}

@media (max-width: 520px) {
  .nav-link { display: none; }
  .brand-name { font-size: 1rem; }
  .nav-cta { padding: 8px 14px; font-size: 0.8rem; }
}
</style>

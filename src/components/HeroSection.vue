<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge">🌿 Digital Garden</div>
      <h1 class="hero-title">
        Tanam Kebaikan,<br>
        <em>Tumbuhkan Perubahan.</em>
      </h1>
      <p class="hero-subtitle">
        Satu kebaikan kecil dari kamu bisa membuat pohon ini semakin rimbun.<br>
        Bergabunglah dan tinggalkan jejak kebaikanmu hari ini.
      </p>
      <div class="hero-actions">
        <button class="btn-primary" @click="$emit('openModal')">
          🌱 Tanam Kebaikan
        </button>
        <a href="#pohon" class="btn-ghost">Lihat Pohon ↓</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">{{ store.totalLeaves }}</span>
          <span class="stat-label">Komitmen Ditanam</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-number">{{ store.treeLevelName }}</span>
          <span class="stat-label">Level Pohon</span>
        </div>
      </div>
    </div>
    <div class="hero-decoration">
      <div class="deco-leaf deco-leaf-1">🍃</div>
      <div class="deco-leaf deco-leaf-2">🌿</div>
      <div class="deco-leaf deco-leaf-3">🍃</div>
    </div>
  </section>
</template>

<script setup>
import { useTreeStore } from '../stores/tree.js'

defineEmits(['openModal'])
const store = useTreeStore()
</script>

<style scoped>
.hero {
  position: relative;
  padding: 140px 24px 80px;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  max-width: 680px;
  margin: 0 auto;
  animation: slideUp 0.8s ease both;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--green-300);
  color: var(--green-800);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  margin-bottom: 24px;
  backdrop-filter: blur(4px);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 600;
  line-height: 1.18;
  color: var(--green-900);
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

.hero-title em {
  font-style: italic;
  color: var(--green-700);
}

.hero-subtitle {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.btn-primary {
  background: var(--green-700);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 20px rgba(64, 145, 108, 0.4), 0 1px 0 rgba(255,255,255,0.2) inset;
  transition: background var(--transition), transform var(--spring), box-shadow var(--transition);
}

.btn-primary:hover {
  background: var(--green-800);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(64, 145, 108, 0.5);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-ghost {
  color: var(--green-700);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  padding: 14px 20px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--green-300);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  transition: all var(--transition);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: var(--green-500);
  transform: translateY(-1px);
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(183, 228, 199, 0.6);
  border-radius: var(--radius-lg);
  padding: 16px 32px;
  backdrop-filter: blur(8px);
  animation: slideUp 0.8s 0.2s ease both;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--green-800);
  line-height: 1;
  animation: countUp 0.3s ease both;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--green-300);
}

.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco-leaf {
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  animation: float 5s ease-in-out infinite;
}

.deco-leaf-1 { top: 20%; left: 8%;  animation-delay: 0s; font-size: 2.5rem; }
.deco-leaf-2 { top: 35%; right: 6%; animation-delay: 1.5s; font-size: 1.8rem; }
.deco-leaf-3 { bottom: 20%; left: 12%; animation-delay: 0.8s; }

@media (max-width: 600px) {
  .hero { padding: 120px 16px 60px; }
  .hero-stats { padding: 14px 20px; gap: 16px; }
  .stat-number { font-size: 1.1rem; }
}
</style>

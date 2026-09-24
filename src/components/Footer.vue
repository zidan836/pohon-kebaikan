<template>
  <footer class="footer" id="tentang">
    <div class="footer-inner">
      <div class="footer-about">
        <div class="footer-brand">
          <span class="footer-icon">🌳</span>
          <span class="footer-name">Pohon Kebaikan Virtual</span>
        </div>
        <p class="footer-desc">
          Sebuah taman digital di mana setiap komitmen kebaikan kecil menjadi daun yang menghijau.
          Bersama-sama kita tumbuhkan perubahan, satu kebaikan dalam satu waktu.
        </p>
      </div>

      <div class="footer-stats">
        <div class="footer-stat">
          <span class="footer-stat-num">{{ store.totalLeaves }}</span>
          <span class="footer-stat-label">Kebaikan Ditanam</span>
        </div>
        <div class="footer-stat">
          <span class="footer-stat-num">{{ store.treeLevel }}/5</span>
          <span class="footer-stat-label">Level Pohon</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-quote">"Setiap kebaikan kecil berarti."</p>
      <p class="footer-copy">Dibuat dengan ❤️ untuk dunia yang lebih baik</p>
    </div>
  </footer>
</template>

<script setup>
import { useTreeStore } from '../stores/tree.js'
const store = useTreeStore()
</script>

<style scoped>
.footer {
  margin-top: 80px;
  background: linear-gradient(180deg, transparent 0%, rgba(27,67,50,0.04) 100%);
  border-top: 1px solid var(--green-200);
}

.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 24px;
  display: flex;
  gap: 48px;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.footer-icon {
  font-size: 1.6rem;
  animation: float 4s ease-in-out infinite;
}

.footer-name {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--green-900);
}

.footer-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 340px;
}

.footer-stats {
  display: flex;
  gap: 32px;
}

.footer-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.footer-stat-num {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--green-700);
  line-height: 1;
}

.footer-stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.footer-bottom {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 24px 40px;
  border-top: 1px solid var(--green-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.footer-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--green-700);
}

.footer-copy {
  font-size: 0.78rem;
  color: var(--text-light);
}

@media (max-width: 600px) {
  .footer-inner { flex-direction: column; gap: 28px; padding: 36px 16px 20px; }
  .footer-stats { align-self: center; }
  .footer-bottom { padding: 16px 16px 32px; }
}
</style>

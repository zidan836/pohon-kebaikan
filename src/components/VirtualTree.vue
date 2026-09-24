<template>
  <div class="tree-scene" id="pohon">
    <div class="tree-container" :class="`level-${store.treeLevel}`">

      <!-- SVG Tree -->
      <svg
        class="tree-svg"
        viewBox="0 0 400 520"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- Canopy background circles (grow with level) -->
        <g class="canopy-bg">
          <ellipse cx="200" cy="195" rx="115" ry="90" fill="rgba(82,183,136,0.10)" />
          <ellipse cx="200" cy="180" rx="95"  ry="75" fill="rgba(64,145,108,0.12)" />
          <ellipse cx="170" cy="200" rx="75"  ry="60" fill="rgba(45,106,79,0.08)" />
          <ellipse cx="230" cy="195" rx="75"  ry="60" fill="rgba(45,106,79,0.08)" />
          <ellipse cx="200" cy="150" rx="65"  ry="50" fill="rgba(82,183,136,0.09)" />
        </g>

        <!-- Roots -->
        <g class="roots">
          <path d="M185 490 Q175 505 155 508" stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/>
          <path d="M200 492 Q200 508 210 514" stroke="#795548" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>
          <path d="M215 490 Q228 504 248 507" stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/>
        </g>

        <!-- Trunk -->
        <path
          d="M183 496 Q178 440 182 390 Q186 355 192 325 Q196 305 200 290"
          stroke="#6D4C41" stroke-width="30" fill="none" stroke-linecap="round"
        />
        <path
          d="M217 496 Q222 440 218 390 Q214 355 208 325 Q204 305 200 290"
          stroke="#6D4C41" stroke-width="30" fill="none" stroke-linecap="round"
        />
        <path
          d="M183 496 Q178 440 182 390 Q186 355 192 325 Q196 305 200 290 Q204 305 208 325 Q214 355 218 390 Q222 440 217 496 Z"
          fill="#795548"
        />
        <!-- Trunk highlight -->
        <path
          d="M196 460 Q193 420 194 380 Q195 350 198 325"
          stroke="rgba(255,255,255,0.12)" stroke-width="6" fill="none" stroke-linecap="round"
        />

        <!-- Main branches -->
        <!-- Left branch 1 -->
        <path
          class="branch"
          d="M190 355 Q165 335 140 310 Q118 290 95 275"
          stroke="#6D4C41" stroke-width="14" fill="none" stroke-linecap="round"
        />
        <!-- Left branch 2 -->
        <path
          class="branch"
          d="M188 320 Q158 295 135 270 Q118 252 108 230"
          stroke="#6D4C41" stroke-width="10" fill="none" stroke-linecap="round"
        />
        <!-- Right branch 1 -->
        <path
          class="branch"
          d="M210 360 Q235 340 260 315 Q280 295 305 280"
          stroke="#6D4C41" stroke-width="14" fill="none" stroke-linecap="round"
        />
        <!-- Right branch 2 -->
        <path
          class="branch"
          d="M212 325 Q240 298 265 272 Q282 254 292 232"
          stroke="#6D4C41" stroke-width="10" fill="none" stroke-linecap="round"
        />
        <!-- Center branch -->
        <path
          class="branch"
          d="M200 300 Q198 270 197 240 Q196 215 196 190"
          stroke="#6D4C41" stroke-width="11" fill="none" stroke-linecap="round"
        />

        <!-- Sub-branches -->
        <g class="sub-branches">
          <path d="M95 275 Q78 258 68 240"  stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M108 230 Q95 215 90 198"  stroke="#795548" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M305 280 Q322 262 332 244" stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M292 232 Q306 215 310 198" stroke="#795548" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M196 190 Q188 168 186 150"  stroke="#795548" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M196 190 Q208 168 212 150"  stroke="#795548" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M140 310 Q128 295 118 282"  stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M260 315 Q272 298 282 285"  stroke="#795548" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Ground grass -->
        <g class="ground">
          <ellipse cx="200" cy="510" rx="180" ry="12" fill="rgba(82,183,136,0.15)"/>
          <path d="M80 510 Q85 498 90 510" stroke="#52B788" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M95 510 Q98 502 101 510" stroke="#40916C" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M300 510 Q305 498 310 510" stroke="#52B788" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M315 510 Q318 503 321 510" stroke="#40916C" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M155 510 Q158 503 161 510" stroke="#52B788" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M240 510 Q243 502 246 510" stroke="#40916C" stroke-width="2" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Level 1 sprout leaves (shown only at bibit level) -->
        <g class="sprout-leaves" v-if="store.treeLevel === 1">
          <ellipse cx="185" cy="285" rx="14" ry="9"  fill="#52B788" transform="rotate(-30,185,285)" opacity="0.9"/>
          <ellipse cx="215" cy="278" rx="14" ry="9"  fill="#40916C" transform="rotate(30,215,278)"  opacity="0.9"/>
        </g>
      </svg>

      <!-- Leaf components overlaid on the canopy -->
      <div class="leaves-overlay">
        <Leaf
          v-for="(leaf, i) in store.leaves"
          :key="leaf.id"
          :leaf="leaf"
          :index="i"
          @click="onLeafClick"
        />
      </div>

      <!-- Empty state hint -->
      <div v-if="store.totalLeaves === 0" class="empty-hint">
        <p>Pohon masih kosong...<br>Jadilah yang pertama menanam kebaikan! 🌱</p>
      </div>
    </div>

    <!-- Leaf detail popup -->
    <Transition name="popup">
      <div v-if="activeLeaf" class="leaf-popup" @click.stop>
        <button class="popup-close" @click="activeLeaf = null" aria-label="Tutup">✕</button>
        <div class="popup-icon">🍃</div>
        <p class="popup-text">"{{ activeLeaf.text }}"</p>
        <span class="popup-date">{{ formatDate(activeLeaf.createdAt) }}</span>
        <button class="popup-delete" @click="deleteLeaf(activeLeaf.id)">Hapus daun ini</button>
      </div>
    </Transition>

    <!-- Backdrop to close popup -->
    <div v-if="activeLeaf" class="popup-backdrop" @click="activeLeaf = null"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTreeStore } from '../stores/tree.js'
import Leaf from './Leaf.vue'

const store = useTreeStore()
const activeLeaf = ref(null)

function onLeafClick(leaf) {
  activeLeaf.value = leaf
}

function deleteLeaf(id) {
  store.removeLeaf(id)
  activeLeaf.value = null
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<style scoped>
.tree-scene {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 16px 40px;
}

.tree-container {
  position: relative;
  width: 100%;
  max-width: 440px;
  transition: transform var(--transition-slow);
}

.tree-svg {
  width: 100%;
  height: auto;
  display: block;
  transition: transform var(--transition-slow);
}

/* Level-based size scaling */
.level-1 .tree-svg { transform: scale(0.72); transform-origin: bottom center; }
.level-2 .tree-svg { transform: scale(0.82); transform-origin: bottom center; }
.level-3 .tree-svg { transform: scale(0.92); transform-origin: bottom center; }
.level-4 .tree-svg { transform: scale(1);    transform-origin: bottom center; }
.level-5 .tree-svg { transform: scale(1.08); transform-origin: bottom center; }

/* Canopy bg grows with level */
.level-1 .canopy-bg { opacity: 0; }
.level-2 .canopy-bg { opacity: 0.5; }
.level-3 .canopy-bg { opacity: 0.75; }
.level-4 .canopy-bg { opacity: 1; }
.level-5 .canopy-bg { opacity: 1; filter: saturate(1.2); }

.level-1 .branch       { opacity: 0.3; }
.level-2 .branch       { opacity: 0.65; }
.level-3 .branch       { opacity: 0.85; }
.level-1 .sub-branches { opacity: 0; }
.level-2 .sub-branches { opacity: 0.3; }
.level-3 .sub-branches { opacity: 0.6; }

/* SVG v-if doesn't work — hide with visibility */
.sprout-leaves { display: none; }

.leaves-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* Height of canopy area: roughly top 68% of the svg */
  bottom: 32%;
  pointer-events: none;
}

.leaves-overlay > * {
  pointer-events: auto;
}

.empty-hint {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  pointer-events: none;
  white-space: nowrap;
}

/* Leaf popup */
.leaf-popup {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--cream-light);
  border: 1.5px solid var(--green-300);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  width: min(360px, calc(100vw - 32px));
  box-shadow: var(--shadow-xl);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.popup-icon {
  font-size: 2rem;
  line-height: 1;
}

.popup-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--green-900);
  line-height: 1.6;
}

.popup-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.popup-close {
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: color var(--transition), background var(--transition);
}

.popup-close:hover {
  background: var(--green-100);
  color: var(--green-800);
}

.popup-delete {
  background: none;
  color: #C62828;
  font-size: 0.78rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  margin-top: 4px;
  transition: background var(--transition);
  opacity: 0.7;
}

.popup-delete:hover {
  background: #FFEBEE;
  opacity: 1;
}

.popup-backdrop {
  position: fixed;
  inset: 0;
  z-index: 199;
}

/* Popup transition */
.popup-enter-active { animation: slideUp 0.3s var(--spring) both; }
.popup-leave-active { animation: slideUp 0.2s ease reverse; }

@media (max-width: 480px) {
  .tree-container { max-width: 100%; }
  .level-5 .tree-svg { transform: scale(1); }
}
</style>

<template>
  <button
    class="leaf"
    :class="[`leaf-color-${colorIndex}`, { 'leaf-new': isNew }]"
    :style="leafStyle"
    :title="leaf.text"
    @click="$emit('click', leaf)"
  >
    <span class="leaf-inner"></span>
    <span class="leaf-vein"></span>
  </button>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  leaf: { type: Object, required: true },
  index: { type: Number, required: true },
})

defineEmits(['click'])

const isNew = ref(true)
onMounted(() => {
  setTimeout(() => { isNew.value = false }, 800)
})

const colorIndex = computed(() => props.index % 7)

const rotations = [12, -18, 25, -8, 32, -22, 15, -35, 5, -12, 28, -20]
const sizes     = [22, 26, 20, 24, 19, 27, 21, 25, 18, 23]

const leafStyle = computed(() => {
  const rot  = rotations[props.index % rotations.length]
  const size = sizes[props.index % sizes.length]
  return {
    left: `${props.leaf.position.x}%`,
    top:  `${props.leaf.position.y}%`,
    '--leaf-rotate': `${rot}deg`,
    '--leaf-size':   `${size}px`,
  }
})
</script>

<style scoped>
.leaf {
  position: absolute;
  transform: translate(-50%, -50%) rotate(var(--leaf-rotate, 15deg));
  width: calc(var(--leaf-size, 22px) * 1);
  height: calc(var(--leaf-size, 22px) * 1.4);
  border-radius: 50% 0 50% 0;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: transform var(--spring), filter var(--transition);
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  z-index: 2;
}

.leaf:hover {
  transform: translate(-50%, -50%) rotate(var(--leaf-rotate, 15deg)) scale(1.35);
  filter: brightness(1.1);
  z-index: 10;
}

.leaf:focus-visible {
  outline: 2px solid var(--green-600);
  outline-offset: 3px;
}

.leaf-inner {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
}

.leaf-vein {
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 1px;
  height: 60%;
  background: rgba(255,255,255,0.25);
  border-radius: 1px;
}

/* Color palette — 7 shades of green */
.leaf-color-0 { background: #40916C; }
.leaf-color-1 { background: #52B788; }
.leaf-color-2 { background: #2D6A4F; }
.leaf-color-3 { background: #74C69D; }
.leaf-color-4 { background: #1B4332; }
.leaf-color-5 { background: #95D5B2; }
.leaf-color-6 { background: #3A7D5E; }

/* New leaf animation */
.leaf-new {
  animation: leafAppear 0.7s var(--spring) both;
}
</style>

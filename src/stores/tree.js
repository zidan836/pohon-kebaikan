import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'pohon-kebaikan-leaves'

const GOLDEN_ANGLE = 137.508 * (Math.PI / 180)

function computeLeafPosition(index) {
  // Phyllotaxis (sunflower) distribution — natural-looking spread
  const r = Math.sqrt((index + 1) / 100) * 38
  const theta = index * GOLDEN_ANGLE
  // Canopy center at 50%, 33% — slightly elliptical spread
  const x = 50 + r * Math.cos(theta) * 0.9
  const y = 33 + r * Math.sin(theta) * 0.72
  // Clamp within canopy bounds
  return {
    x: Math.max(14, Math.min(86, x)),
    y: Math.max(5,  Math.min(62, y)),
  }
}

const LEVEL_THRESHOLDS = [0, 5, 15, 30, 50]
const LEVEL_NAMES = ['Bibit', 'Pohon Kecil', 'Pohon Sedang', 'Pohon Rimbun', 'Pohon Kebaikan']

export const useTreeStore = defineStore('tree', () => {
  const leaves = ref(loadFromStorage())

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  watch(
    leaves,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch { /* quota exceeded — silently ignore */ }
    },
    { deep: true }
  )

  const totalLeaves = computed(() => leaves.value.length)

  const treeLevel = computed(() => {
    const n = totalLeaves.value
    if (n >= 50) return 5
    if (n >= 30) return 4
    if (n >= 15) return 3
    if (n >= 5)  return 2
    return 1
  })

  const treeLevelName = computed(() => LEVEL_NAMES[treeLevel.value - 1])

  const nextLevelThreshold = computed(() => {
    const level = treeLevel.value
    return level < 5 ? LEVEL_THRESHOLDS[level] : null
  })

  const progressToNext = computed(() => {
    const level = treeLevel.value
    if (level >= 5) return 100
    const from = LEVEL_THRESHOLDS[level - 1]
    const to   = LEVEL_THRESHOLDS[level]
    return Math.round(((totalLeaves.value - from) / (to - from)) * 100)
  })

  function addLeaf(text) {
    const trimmed = text.trim()
    if (!trimmed || trimmed.length > 150) return false
    const index = leaves.value.length
    leaves.value.push({
      id: Date.now(),
      text: trimmed,
      position: computeLeafPosition(index),
      createdAt: Date.now(),
    })
    return true
  }

  function removeLeaf(id) {
    const idx = leaves.value.findIndex((l) => l.id === id)
    if (idx !== -1) {
      leaves.value.splice(idx, 1)
      // Recompute positions so tree stays compact
      leaves.value.forEach((leaf, i) => {
        leaf.position = computeLeafPosition(i)
      })
    }
  }

  function clearLeaves() {
    leaves.value = []
  }

  return {
    leaves,
    totalLeaves,
    treeLevel,
    treeLevelName,
    nextLevelThreshold,
    progressToNext,
    addLeaf,
    removeLeaf,
    clearLeaves,
  }
})

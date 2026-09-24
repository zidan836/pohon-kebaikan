<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-backdrop" @click.self="close">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button class="modal-close" @click="close" aria-label="Tutup modal">✕</button>

          <div class="modal-header">
            <span class="modal-icon">🌱</span>
            <h2 id="modal-title" class="modal-title">Tanam Kebaikanmu</h2>
            <p class="modal-subtitle">Tuliskan satu komitmen kebaikan kecil yang ingin kamu lakukan hari ini.</p>
          </div>

          <form class="modal-form" @submit.prevent="submit">
            <div class="field-wrapper">
              <textarea
                ref="inputRef"
                v-model="text"
                class="commitment-input"
                :class="{ error: showError }"
                placeholder="Tuliskan kebaikan kecil yang ingin kamu lakukan..."
                rows="4"
                maxlength="150"
                @input="showError = false"
              ></textarea>
              <div class="field-footer">
                <span class="error-msg" v-if="showError">{{ errorMsg }}</span>
                <span v-else></span>
                <span class="char-count" :class="{ warn: text.length > 120 }">
                  {{ text.length }}/150
                </span>
              </div>
            </div>

            <div class="suggestions">
              <p class="suggestions-label">Contoh kebaikan:</p>
              <div class="suggestion-chips">
                <button
                  v-for="s in suggestions"
                  :key="s"
                  type="button"
                  class="chip"
                  @click="text = s; showError = false"
                >{{ s }}</button>
              </div>
            </div>

            <button type="submit" class="btn-submit" :disabled="submitting">
              <span v-if="submitting">Menanam...</span>
              <span v-else>🌿 Tanam Kebaikan</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useTreeStore } from '../stores/tree.js'

const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue'])

const store = useTreeStore()
const text       = ref('')
const showError  = ref(false)
const errorMsg   = ref('')
const submitting = ref(false)
const inputRef   = ref(null)

const suggestions = [
  'Hari ini aku akan membuang sampah pada tempatnya.',
  'Hari ini aku akan membantu orang tua.',
  'Hari ini aku akan tersenyum kepada orang lain.',
  'Hari ini aku akan belajar dengan sungguh-sungguh.',
  'Hari ini aku akan mengucapkan terima kasih.',
]

watch(() => props.modelValue, async (val) => {
  if (val) {
    text.value = ''
    showError.value = false
    await nextTick()
    inputRef.value?.focus()
  }
})

function close() {
  emit('update:modelValue', false)
}

async function submit() {
  const trimmed = text.value.trim()
  if (!trimmed) {
    errorMsg.value = 'Komitmen tidak boleh kosong.'
    showError.value = true
    return
  }
  if (trimmed.length > 150) {
    errorMsg.value = 'Maksimal 150 karakter.'
    showError.value = true
    return
  }

  submitting.value = true
  await new Promise((r) => setTimeout(r, 300)) // brief pause for feel
  store.addLeaf(trimmed)
  submitting.value = false
  text.value = ''
  close()
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(27, 67, 50, 0.38);
  backdrop-filter: blur(8px);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal {
  background: var(--cream-light);
  border-radius: var(--radius-xl);
  padding: 36px 32px 32px;
  width: 100%;
  max-width: 460px;
  position: relative;
  box-shadow: var(--shadow-xl), 0 0 0 1px rgba(183, 228, 199, 0.4);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 18px;
  background: var(--green-100);
  color: var(--text-secondary);
  font-size: 0.9rem;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), color var(--transition);
}

.modal-close:hover {
  background: var(--green-300);
  color: var(--green-900);
}

.modal-header {
  text-align: center;
  margin-bottom: 28px;
}

.modal-icon {
  font-size: 2.8rem;
  display: block;
  margin-bottom: 12px;
  animation: float 3s ease-in-out infinite;
}

.modal-title {
  font-family: var(--font-serif);
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--green-900);
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.commitment-input {
  width: 100%;
  resize: none;
  border: 1.5px solid var(--green-300);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-primary);
  background: rgba(255,255,255,0.8);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.commitment-input:focus {
  border-color: var(--green-600);
  box-shadow: 0 0 0 3px rgba(82, 183, 136, 0.2);
}

.commitment-input.error {
  border-color: #E53935;
  box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.12);
}

.field-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-msg {
  font-size: 0.8rem;
  color: #C62828;
  font-weight: 500;
}

.char-count {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.char-count.warn { color: #E65100; }

.suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggestions-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  background: var(--green-100);
  border: 1px solid var(--green-300);
  color: var(--green-800);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  transition: background var(--transition), border-color var(--transition), transform var(--spring);
  text-align: left;
}

.chip:hover {
  background: var(--green-300);
  border-color: var(--green-500);
  transform: translateY(-1px);
}

.btn-submit {
  background: linear-gradient(135deg, var(--green-700) 0%, var(--green-600) 100%);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(64, 145, 108, 0.4);
  transition: transform var(--spring), box-shadow var(--transition), opacity var(--transition);
  letter-spacing: 0.01em;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(64, 145, 108, 0.5);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Modal transition */
.modal-enter-active .modal  { animation: scaleIn 0.32s var(--spring) both; }
.modal-leave-active .modal  { animation: scaleIn 0.2s ease reverse; }
.modal-enter-active,
.modal-leave-active          { transition: opacity 0.25s ease; }
.modal-enter-from,
.modal-leave-to              { opacity: 0; }

@media (max-width: 480px) {
  .modal { padding: 28px 20px 24px; border-radius: var(--radius-lg); }
  .modal-title { font-size: 1.3rem; }
}
</style>

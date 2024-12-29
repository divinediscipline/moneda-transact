import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('success')

export function useToast() {
  const show = (msg, t = 'success') => {
    message.value = msg
    type.value = t
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  const success = (msg) => show(msg, 'success')
  const error = (msg) => show(msg, 'error')

  return {
    visible,
    message,
    type,
    show,
    success,
    error
  }
}
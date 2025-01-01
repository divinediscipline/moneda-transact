import { ref } from 'vue'
import { maxFileSize, allowedFileTypes } from '@/utils/validators'

export const useFileUpload = (options = { maxSize: 2, types: ['pdf', 'docx', 'pptx', 'xlsx'] }) => {
  const file = ref(null)
  const error = ref('')

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0]
    error.value = ''

    if (!uploadedFile) return

    // Validate file size
    const sizeValidation = maxFileSize(uploadedFile, options.maxSize)
    if (sizeValidation !== true) {
      error.value = sizeValidation
      return
    }

    // Validate file type
    const typeValidation = allowedFileTypes(uploadedFile, options.types)
    if (typeValidation !== true) {
      error.value = typeValidation
      return
    }

    file.value = uploadedFile
  }

  const clearFile = () => {
    file.value = null
    error.value = ''
  }

  return {
    file,
    error,
    handleUpload,
    clearFile
  }
}
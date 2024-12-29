export const required = (value) => !!value || 'This field is required'

export const minValue = (min) => (value) => 
  !value || Number(value) >= min || `Value must be greater than ${min}`

export const maxFileSize = (file, maxSize) => {
  if (!file) return true
  return file.size <= maxSize * 1024 * 1024 || `File size must be less than ${maxSize}MB`
}

export const allowedFileTypes = (file, types) => {
  if (!file) return true
  const extension = file.name.split('.').pop().toLowerCase()
  return types.includes(extension) || `Allowed file types: ${types.join(', ')}`
}
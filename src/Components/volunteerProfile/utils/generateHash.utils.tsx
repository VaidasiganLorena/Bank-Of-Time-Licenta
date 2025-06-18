export const generateHash = (text: string): string => {
  let hash = 0
  if (text.length === 0) return hash.toString()

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

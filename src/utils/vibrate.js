export function vibrate(pattern) {
  if (!navigator.vibrate) return
  navigator.vibrate(pattern)
}

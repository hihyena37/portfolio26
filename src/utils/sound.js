let effectsEnabled = true
const activeEffects = new Map()

export function setEffectsEnabled(enabled) {
  effectsEnabled = enabled
  if (!enabled) {
    for (const [audio, cleanup] of [...activeEffects]) {
      audio.pause()
      cleanup()
    }
  }
}

export function playEffect(audio) {
  if (!effectsEnabled) return

  activeEffects.get(audio)?.()
  const cleanup = () => {
    if (activeEffects.get(audio) === cleanup) activeEffects.delete(audio)
    audio.removeEventListener('ended', cleanup)
    audio.removeEventListener('pause', cleanup)
    audio.removeEventListener('error', cleanup)
  }
  activeEffects.set(audio, cleanup)
  audio.addEventListener('ended', cleanup)
  audio.addEventListener('pause', cleanup)
  audio.addEventListener('error', cleanup)

  audio.play().then(() => {
    if (!effectsEnabled) audio.pause()
  }).catch(cleanup)
}

const ANSWERED_FORM_KEY = 'ketsu_has_answered_form'

export const getHasAnsweredForm = () => {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(ANSWERED_FORM_KEY) === 'true'
}

export const setHasAnsweredForm = (value) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ANSWERED_FORM_KEY, value ? 'true' : 'false')
  window.dispatchEvent(new Event('answeredFormUpdated'))
}

export const subscribeAnsweredForm = (callback) => {
  if (typeof window === 'undefined') return () => {}

  const handleStorage = (event) => {
    if (event.key === ANSWERED_FORM_KEY) {
      callback(getHasAnsweredForm())
    }
  }

  const handleCustom = () => {
    callback(getHasAnsweredForm())
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener('answeredFormUpdated', handleCustom)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener('answeredFormUpdated', handleCustom)
  }
}

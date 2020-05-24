import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initialValue, options = {}) => {
  const { deleteKeyIfValueIs = null } = options
  // We pass useState a function that handles initial state creation.
  // That way, the function is executed only once and useLocalStorage
  // returns the correct value on initial render.
  const [value, setValue] = useState(() => {
    // During SSR, localStorage is unavailable so we go straight to initialValue.
    if (typeof localStorage === `undefined`) return initialValue
    try {
      const value = localStorage[key]
      // Parse stored JSON if there was any, else return initialValue.
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    // If key is not in localStorage, set it to the provided initial value to
    // ensure we store it even if setStoredValue is never called.
    if (localStorage[key] === undefined) localStorage[key] = JSON.stringify(value)

    // The CustomEvent triggered by a call to useLocalStorage somewhere
    // else in the app carries the new value as the event.detail.
    const cb = event => setValue(event.detail)

    // Register event listener on initial state creation. Allows us to react
    // to events emitted by setValue below. That way we can keep value in sync
    // between multiple call sites to useLocalStorage with the same key.
    document.addEventListener(`localStorage:${key}Change`, cb)
    return () => document.removeEventListener(`localStorage:${key}Change`, cb)
  }, [value, key])

  const setStoredValue = newValue => {
    if (newValue === value) return

    // Conform to useState API by allowing newValue to be a function
    // which takes the current value.
    if (newValue instanceof Function) newValue = newValue(value)

    const event = new CustomEvent(`localStorage:${key}Change`, {
      detail: newValue,
    })
    document.dispatchEvent(event)

    setValue(newValue)

    if (newValue === deleteKeyIfValueIs) delete localStorage[key]
    else localStorage[key] = JSON.stringify(newValue)
  }
  return [value, setStoredValue]
}

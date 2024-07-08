
import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    setValue
  }
}

// los módulos pueden tener muchas exportaciones nombradas

export const useAnotherHook = () => {
  // ...
}
import  { useEffect, useState } from 'react'
// экспортируем и передаем в budgetContext 
export default function useLocalStorage(key, defaultValue) {
  // в state будет функция
  const [value, setValue] = useState(()=> {
    // берем из local или используем defaultValue
    const jsonValue = localStorage.getItem(key)
    // если есть значение проверяем
if(jsonValue !== null) return JSON.parse(jsonValue)
// проверяем что было передано в state  - функция или значение
if( typeof defaultValue === 'function') {
  return defaultValue() // если ф.  
} else {
  return defaultValue  // если значение  
}
  })
// следим за изменениями в LocalStorage
useEffect(()=> {
  localStorage.setItem(key, JSON.stringify(value))
}, [key, value])

  return [value, setValue]
}

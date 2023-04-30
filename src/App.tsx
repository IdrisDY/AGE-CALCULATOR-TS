import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainView from './dateview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        < MainView/>
    </>
  )
}

export default App

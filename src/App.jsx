import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GraphBar from './components/GraphPart'
import SideBar from './components/SidePart'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
<div className='flex gap-4'>
  <GraphBar/>
  <SideBar/>
</div>
   </>
  )
}

export default App

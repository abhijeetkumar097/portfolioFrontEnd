import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Skill from './Skill/Skill'
import Education from './Education/Education'
import FrontPage from './FrontPage/FrontPage'
import Certificate from './Certificate/Certificate'
import Project from './Project/Project'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Skill />
      <FrontPage />
      <Certificate />
      <Education />
      <Project />
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Skill from './Skill/Skill'
import Education from './Education/Education'
import FrontPage from './FrontPage/FrontPage'
import Certificate from './Certificate/Certificate'
import Project from './Project/Project'
import Navbar from './Navbar/Navbar'
import Contact from './Contact/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />}/>
          <Route path="/project" element={<Project />}/>
          <Route path="/about" element={<><Education /><Skill /><Certificate /></>}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </Router>
      {/* <Skill />
      <Certificate />
      <Education />
      <Project />  */}
      {/* <FrontPage /> */}
        {/* <Education />
        <Certificate /> */}
      
      
    </>
  )
}

export default App

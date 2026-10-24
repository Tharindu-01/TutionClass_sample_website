
import { Routes, Route } from 'react-router'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Classes from './pages/Classes'
import ClassInfo from './pages/ClassInfo'
import Timetable from './pages/Timetable'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassInfo />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App

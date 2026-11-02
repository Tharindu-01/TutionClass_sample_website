
import { Routes, Route } from 'react-router'
import './App.css'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import Home from './pages/Home'
import Classes from './pages/Classes'
import ClassInfo from './pages/ClassInfo'
import Timetable from './pages/Timetable'
import Contact from './pages/Contact'
import TeacherProfile from "./pages/TeacherProfile";

import Teachers from "./pages/Teachers";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";





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
          <Route path="/teachers/:id" element={<TeacherProfile />} />
          
          
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

  

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App

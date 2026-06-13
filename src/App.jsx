import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Overview from './pages/Overview.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Method from './pages/Method.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/method" element={<Method />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
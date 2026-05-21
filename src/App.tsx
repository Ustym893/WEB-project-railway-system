import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking'; // Додаємо імпорт

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Додаємо динамічний маршрут з параметром :trainId */}
        <Route path="/booking/:trainId" element={<Booking />} />
      </Routes>
    </div>
  )
}

export default App;
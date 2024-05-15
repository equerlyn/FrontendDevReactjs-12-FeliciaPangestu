import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import FilterBar from './components/FilterBar'
import DetailPage from './pages/DetailPage'

function App() {
  const location = useLocation();
  let mode = 'home';
  if (location.pathname.startsWith('/detail')) {
    mode = 'detail';
  }

  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterChange = (isOpen) => {
    setFilterOpen(isOpen);
  };

  return (
    <div className="app-container">
      <Header/>
      <FilterBar mode={mode} onFilterChange={handleFilterChange}/>
      <main>
        <Routes>
            <Route path="/" element={<HomePage filterOpen={filterOpen}/>} />
            <Route path="/detail/:id" element={<DetailPage/>} />
            <Route path="/*" element={<Navigate to="/" /> } />
        </Routes>
      </main>
    </div>
  )
}

export default App

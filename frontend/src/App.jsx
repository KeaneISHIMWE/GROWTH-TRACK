import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Leads from './components/Leads'
import Pipeline from './components/Pipeline'
import Reports from './components/Reports'

function App() {   
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">GrowthTrack</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
                <li><Link to="/leads" className="hover:text-blue-200">Leads</Link></li>
                <li><Link to="/pipeline" className="hover:text-blue-200">Pipeline</Link></li>
                <li><Link to="/clients" className="hover:text-blue-200">Clients</Link></li>
                <li><Link to="/reports" className="hover:text-blue-200">Reports</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/clients" element={<div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-xl font-semibold mb-4">Clients Management</h2><p className="text-gray-600">Manage your clients here.</p></div>} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

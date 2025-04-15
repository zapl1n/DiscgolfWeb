

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import HomePage from './HomePage'

function App() {
 

  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </Router>
    )
  }

export default App

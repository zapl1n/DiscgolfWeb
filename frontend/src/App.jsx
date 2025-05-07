

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import HomePage from './HomePage'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import Navbar from './Navbar'
import AllPosts from './Allposts'
import {useState} from 'react'





function App() {
  const [searchQuery, setSearchQuery] = useState('');

 

  
    return (
      <Router>
     
      <>

      <Navbar onSearch={setSearchQuery} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/postitused"  element={<AllPosts searchQuery={searchQuery} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}/>
        </Routes>
      </>
      </Router>
    )
  }

export default App

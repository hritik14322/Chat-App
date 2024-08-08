import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './Chat'
import Header from './components/Header'
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home isUser={false}/>}/>
    <Route path="/home" element={<Home isUser={true}/>}/>
    <Route path="/about" element={<Home/>}/>
    <Route path="/contact" element={<Home/>}/>
    <Route path="/ChatNew" element={<Chat isNew={1}/>}/>
    <Route path="/ChatOld" element={<Chat isNew={0}/>}/>
    </Routes>
    </Router>
  )
}

export default App
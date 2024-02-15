import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './Components/Post/Post';
import Home from './Components/Home/Home';
function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:userId" element={<Post />} />
      </Routes>
    </>
  )
}

export default App

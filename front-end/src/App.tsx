import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './Styles/global.css'


const Posts = lazy(() => import('../src/Componentes/Posts.tsx'));
const Home = lazy(() => import('./pages/Home'));
function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Suspense>
  )
}

export default App

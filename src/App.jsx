import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './Pages/Homepage'
import Navbar from './Componets/Navbar'

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
         <Route path='/'>
         <Route index element={<HomePage />} />
         </Route>
      </Routes>
      
    </>
  )
}

export default App
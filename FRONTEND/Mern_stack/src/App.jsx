import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Privateroutes from './components/Privateroutes'

import Login from './components/Login'
import Signup from './components/Signup'

import Home from './components/Home'
import Main from './components/Main'
import Addemployees from './components/Addemployees'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route element={<Privateroutes/>}>
          <Route path='/employees' element={<Main child={<Home/>}/>}></Route>
          <Route path='/addemployee' element={<Main child={<Addemployees/>}/>}></Route>
        </Route>
        
      </Routes>
    </>
  )
}

export default App

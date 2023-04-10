import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './Pages/Home'
import News from './Pages/News'
import Pastpapers from './Pages/Pastpapers'
import FAQS from './Pages/FAQS'
import Test from './Pages/Test'
import Signin from './Pages/Signin';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state)=>state.Login.current)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={user ? <Home/>:<Navigate to="/signin" replace></Navigate>}/>
        <Route path='news' element={<News/>}/>
        <Route path='pastpapers' element={<Pastpapers/>}/>
        <Route path='faq' element={<FAQS/>}/>
        <Route path='test' element={<Test/>}/>
      </Route>
      <Route path='/signin' element={!user ? <Signin/>:<Navigate to="/" replace></Navigate>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
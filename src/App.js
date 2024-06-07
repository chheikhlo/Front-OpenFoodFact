import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Product from './pages/product/Product';
import SearchCategory from './pages/searchCategory/SearchCategory';
import ProductSubstut from './pages/productSubstut/ProductSubstut';
import NavBar from '../src/component/navbar/NavBar';
import Footer from '../src/component/footer/Footer';
import { UserContext } from './context/AuthContext';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('USER')));
  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product' element={<Product />} />
            <Route path='/search-category' element={<SearchCategory/>} />
            <Route path='/productSubstut/:id/:category' element={<ProductSubstut/>} />
         </Routes>
        <Footer/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Product from './pages/product/Product';
import SearchCategory from './pages/searchCategory/SearchCategory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product' element={<Product />} />
          <Route path='/search-category' element={<SearchCategory/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';
import './App.css';
import './scss/app.scss';

export const SearchContext = React.createContext();
console.log(SearchContext);

function App() {
  const [searchValue, setSearchValue] = useState('');
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
    // <div className="wrapper">
    //   <SearchContext.Provider
    //     value={{
    //       searchValue,
    //       setSearchValue,
    //     }}>
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/cart" element={<Cart />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </SearchContext.Provider>
    // </div>
  );
}

export default App;

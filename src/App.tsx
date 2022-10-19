import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loadable from 'react-loadable';
import './App.css';
import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart'*/ './pages/Cart'));
const OnePizza = Loadable({
  loader: () => import(/* webpackChunkName: 'OnePizza'*/ './pages/OnePizza'),
  loading: () => <h1>Идёт загрузка...</h1>,
});

const App: React.FC = () => (
  <div className="wrapper">
    <Header />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:pizzaId" element={<OnePizza />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<h1>Идёт загрузка...</h1>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './components/ShopPage/ShopPage';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './components/Cart/Cart';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

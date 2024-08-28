import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './components/ShopPage/ShopPage';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './components/Cart/Cart';
import ProductPage from './components/ProductPage/ProductPage';
import SignUp from './components/Auth/SignUp/SignUp';
import SignIn from './components/Auth/SignIn/SignIn';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import BillingDetails from './CloseOrder/BillingDetails';
import { ProtectedRoute } from './components/Auth/ProtecteRoute/ProtectedRoute';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:id" element={<ProductPage />} />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <BillingDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

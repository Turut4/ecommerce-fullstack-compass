import ShopPage from './components/ShopPage/ShopPage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop" element={<ShopPage />}></Route>
      </Routes>
    </Router>
  );
}

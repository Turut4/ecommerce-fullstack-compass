import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './components/ShopPage/ShopPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop" element={<ShopPage />}></Route>
      </Routes>
    </Router>
  );
}

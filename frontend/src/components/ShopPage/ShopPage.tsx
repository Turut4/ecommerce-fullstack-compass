import ProductsList from './Products/ProductsList';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import { useState } from 'react';

export default function ShopPage() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <Header search={search} onSetSearch={setSearch} />
      <Banner />
      <ProductsList search={search} />
    </div>
  );
}

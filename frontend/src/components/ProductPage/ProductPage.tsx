import { useParams } from 'react-router-dom';
import { useProduct, useProducts } from '../../hooks/useProduct';
import BenefitsBanner from '../BenefitsBanner/BennefitsBanner';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProductsList from '../ShopPage/Products/ProductsList';
import Path from './Path/Path';
import ProductDetails from './ProductDetails/ProductDetails';

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id!);
  const page = Math.ceil(Math.random() * 5);
  console.log(page);
  const pageSize = 4;
  const { data } = useProducts(page, pageSize, {});

  return (
    <div>
      <Header />
      <Path productName={product?.name} />
      <ProductDetails product={product} isLoading={isLoading} />
      <section>
        <h2 className="related">Related Products</h2>
        <ProductsList
          productData={data}
          page={0}
          onSetPage={function (): void {}}
          pagination={false}
          pageSize={12}
        />
      </section>
      <BenefitsBanner />
      <Footer />
    </div>
  );
}

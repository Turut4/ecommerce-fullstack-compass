import './ProductsList.css';
import { Product } from './Product';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ApiResponse } from '../../../hooks/useProduct';
import Pagination from './Pagination/Pagination';

interface ProductsListProps {
  productData: ApiResponse | undefined;
  isLoadingProducts?: boolean;
  page: number;
  onSetPage: (page: number) => void;
  pageSize: number;
  pagination: boolean;
}

export default function ProductsList({
  isLoadingProducts,
  productData,
  page,
  onSetPage,
  pageSize,
  pagination,
}: ProductsListProps) {
  if (isLoadingProducts) {
    return (
      <ProgressSpinner
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          width: '100vw',
        }}
      />
    );
  }

  

  if (!productData) {
    return <p>No products available</p>;
  }

  const totalPages = Math.ceil(productData?.total / pageSize);

  return (
    <div>
      <div className="products-list">
        {!productData ? (
          <p>No products available</p>
        ) : (
          productData.products.map((p) => (
            <Product
              key={p.name}
              id={p.id}
              name={p.name}
              description={p.shortDescription}
              price={p.price}
              discount={p.percentageDiscount}
              image={p.images[0]}
              createdAt={p.createdAt}
            />
          ))
        )}
      </div>
      {pagination && (
        <Pagination
          onSetPage={onSetPage}
          totalPages={totalPages}
          currentPage={page}
        />
      )}
    </div>
  );
}

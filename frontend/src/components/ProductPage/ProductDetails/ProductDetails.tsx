import { Product, useProductsByName } from '../../../hooks/useProduct';
import { ProgressSpinner } from 'primereact/progressspinner';
import './ ProductDetails.css';
import ProductImageGallery from './ProductImageGallery/ProductImageGallery';
import ProductInfo from './ProductInfoAndDetails/ProductInfo';
import AddProductToCart from './AddToCart/AddProductToCart';
import ProductOptions from './ProductOption/ProductOptions';
import { useState, useEffect } from 'react';
import ProductStatus from './ProductInfoAndDetails/ProductStatus';

interface ProductDetailsProps {
  product: Product | undefined;
  isLoading: boolean;
}

export default function ProductDetails({
  product,
  isLoading,
}: ProductDetailsProps) {
  const { data: productsVariants } = useProductsByName(product?.name);
  const [selectedProduct, setSelectedProduct] = useState(product);

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  if (isLoading)
    return (
      <ProgressSpinner
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          width: '100vw',
        }}
      />
    );

  if (!selectedProduct) return <div>Something went wrong...</div>;

  const colors = productsVariants?.map((variant) => variant.color) as string[];
  const sizes = productsVariants?.map((variant) => variant.size) as string[];
  const ids = productsVariants?.map((variant) => variant.id) as string[];

  return (
    <div className="product-details-page">
      <div className="product-details">
        <ProductImageGallery images={selectedProduct.images} />
        <div className="product-info-section">
          <ProductInfo product={selectedProduct} />
          {colors && sizes && ids && (
            <ProductOptions
              colors={colors}
              sizes={sizes}
              id={ids}
              onVariantChange={(variantId) => {
                const newProduct = productsVariants?.find(
                  (variant) => variant.id === variantId,
                );
                if (newProduct) setSelectedProduct(newProduct);
                console.log(newProduct);
              }}
            />
          )}
          <AddProductToCart product={selectedProduct} />
          <ProductStatus
            tags={selectedProduct.tags}
            sku={selectedProduct.sku}
            category={selectedProduct.category}
          />
        </div>
      </div>
    </div>
  );
}

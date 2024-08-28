import { useState } from 'react';
import './ProductImageGallery.css';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="gallery">
      <div className="all-images">
        {images.map((image, index) => (
          <button
            value={index}
            onClick={(e) => setSelectedImage(parseInt(e.currentTarget.value))}
            key={image}
          >
            <img src={image} alt="Product Image" />
          </button>
        ))}
      </div>
      <div>
        <img
          src={images[selectedImage]}
          alt="Product Image"
          className="focus-image"
        />
      </div>
    </div>
  );
}

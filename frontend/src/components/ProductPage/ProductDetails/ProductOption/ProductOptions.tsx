import { useState, useEffect } from 'react';

interface ProductOptionsProps {
  colors: string[];
  sizes: string[];
  id: string[];
  onVariantChange: (variantId: string) => void;
}

export default function ProductOptions({
  colors,
  sizes,
  id,
  onVariantChange,
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    const variantIndex = colors.findIndex(
      (color, index) =>
        color === selectedColor && sizes[index] === selectedSize,
    );
    if (variantIndex !== -1) {
      onVariantChange(id[variantIndex]);
    }
  }, [selectedColor, selectedSize, colors, sizes, id, onVariantChange]);

  return (
    <div>
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />
      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
    </div>
  );
}

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ color: '#9f9f9f', marginBottom: '10px' }}>Size</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedSize === size ? '#b3863a' : '#f5f5f5',
              color: selectedSize === size ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ color: '#9f9f9f', marginBottom: '10px' }}>Color</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: color,
              border:
                selectedColor === color
                  ? '2px solid #000'
                  : '2px solid #f5f5f5',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

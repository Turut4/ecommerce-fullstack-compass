import './Banner.css';
import { PathIcon } from './PathIcon';

interface BannerProps {
  path: string;
}

export default function Banner({ path }: BannerProps) {
  const isOn = path === 'Cart' || path === 'Checkout';
  return (
    <div className="banner">
      {isOn && (
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          style={{ aspectRatio: '1.5/1', height: '32px' }}
        />
      )}
      <div>
        <h2>{path}</h2>
      </div>
      <div>
        <h3>
          Home <PathIcon /> <span style={{ fontWeight: '500' }}>{path}</span>
        </h3>
      </div>
    </div>
  );
}

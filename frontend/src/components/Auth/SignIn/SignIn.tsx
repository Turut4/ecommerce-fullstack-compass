import { FormEvent, useRef, useState } from 'react';
import './SignIn.css';
import { Toast } from 'primereact/toast';
import 'primereact/resources/primereact.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate } from 'react-router-dom';

interface SignInKeys {
  email: string;
  password: string;
}

interface SignInResponse {
  jwt: string;
  id: string;
  username: string;
  email: string;
}

async function fetchSignIn({
  email,
  password,
}: SignInKeys): Promise<SignInResponse | null> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/users/auth/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetchSignIn({ email, password });

    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.jwt);
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Sign In Successful',
      });
      navigate('/shop');
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Sign In Failed',
      });
    }
  };

  return (
    <div className="signup-container">
      <Toast ref={toast} />
      <div className="form-container">
        <div>
          <h1>Get Started Now</h1>
          <p>Enter your Credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>
        <p className="footer-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <div className="image-container">
        <img src="src/assets/decorative-plants.png" alt="Decorative Plant" />
      </div>
    </div>
  );
}

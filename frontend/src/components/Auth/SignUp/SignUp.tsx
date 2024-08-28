import { FormEvent, useRef, useState } from 'react';
import './SignUp.css';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

interface SignUpKeys {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  username: string;
  email: string;
  is_admin: boolean;
  jwt: string;
}

async function fetchSignUp({
  name,
  email,
  password,
}: SignUpKeys): Promise<SignUpResponse | null> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/users/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetchSignUp({ name, email, password });

    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.jwt);
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Sign Up Successful',
      });
      navigate('/shop');
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Sign Up Failed`,
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
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <label>
            <input type="checkbox" required />I agree to the Terms & Policies
          </label>
          <button type="submit">Sign up</button>
        </form>
        <p className="footer-text">
          Have an account?{' '}
          <a href="#" onClick={() => navigate('/signin')}>
            Sign in
          </a>
        </p>
      </div>
      <div className="image-container">
        <img src="src/assets/decorative-plants.png" alt="Decorative Plant" />
      </div>
    </div>
  );
}

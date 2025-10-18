
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const { addToast } = useToast();


  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        addToast('Login successful!', 'success');
      } else {
        await signup(name, email, password);
        addToast('Sign up successful!', 'success');
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="bg-base-200 p-8 rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <div className="flex border-b border-base-300 mb-6">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-lg font-semibold ${isLogin ? 'text-accent border-b-2 border-accent' : 'text-gray-400'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-lg font-semibold ${!isLogin ? 'text-accent border-b-2 border-accent' : 'text-gray-400'}`}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-base-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-base-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-base-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent" required />
          </div>
          {error && <p className="text-error text-sm mb-4">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:bg-gray-500">
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

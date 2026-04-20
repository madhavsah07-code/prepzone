import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { currentUser, login, loginWithEmail, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) await signup(email, password);
    else await loginWithEmail(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 px-6">
      <div className="max-w-md w-full space-y-8 backdrop-blur-xl bg-white/70 p-10 rounded-3xl shadow-2xl border border-white/40">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isSignup ? 'Create an account' : 'Welcome to PrepZone'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">Your ultimate interview prep tracker</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="appearance-none w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="appearance-none w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
            </div>
          </div>
          <Button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">{isSignup ? 'Sign Up' : 'Sign In'}</Button>
        </form>
        <div className="mt-4 text-center">
          <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-sm font-medium text-blue-600 hover:text-purple-600 transition">
            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-3 bg-transparent text-gray-500 font-medium">Or continue with</span></div>
          </div>
          <div className="mt-6">
            <Button onClick={login} variant="secondary" className="w-full py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition">Sign in with Google</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
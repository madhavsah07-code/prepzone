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
    <div className="min-h-screen flex items-center justify-center px-6 bg-black relative overflow-hidden">

      {/*  Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[120px] bottom-[-100px] right-[-100px]"></div>

      {/*  Card */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-black/50 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10">

        {/*  Title */}
        <div>
          <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            {isSignup ? 'Create Account' : 'Welcome to PrepZone'}
          </h2>

          <p className="mt-2 text-center text-sm text-gray-400">
            Your ultimate interview prep tracker
          </p>
        </div>

        {/*  Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <input
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />

          </div>

          <Button type="submit" className="w-full py-3">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        {/*  Toggle */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-orange-400 hover:text-orange-300 transition"
          >
            {isSignup
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>

        {/*  Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-black text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/*  Google Login */}
        <Button
          onClick={login}
          variant="secondary"
          className="w-full py-3"
        >
          Sign in with Google
        </Button>

      </div>
    </div>
  );
};

export default LoginPage;
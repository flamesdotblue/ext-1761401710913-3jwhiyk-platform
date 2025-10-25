import { useState } from 'react';
import { X } from 'lucide-react';

function AuthModal({ open, onClose, onSubmit }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register' && !name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ mode, name, email, password });
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl transition-transform ${open ? 'scale-100' : 'scale-95'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
          <button className="p-2 rounded-md hover:bg-neutral-50" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4 inline-flex rounded-md bg-neutral-100 p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`px-3 py-1 rounded ${mode === 'login' ? 'bg-white shadow' : ''}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`px-3 py-1 rounded ${mode === 'register' ? 'bg-white shadow' : ''}`}
            >
              Register
            </button>
          </div>

          {mode === 'register' && (
            <div className="mb-4">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Jane Doe"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-rose-600 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
          <p className="text-xs text-neutral-600 mt-3">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;

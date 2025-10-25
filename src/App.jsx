import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import CheckoutPanel from './components/CheckoutPanel';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState([]);

  // Mock products (in a real app these would be loaded from backend)
  const products = useMemo(
    () => [
      {
        id: 'c1',
        name: 'Classic Chocolate Cake',
        description: 'Rich Belgian chocolate sponge with ganache frosting.',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1645805740318-31bb7604ffd9?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwQ2hvY29sYXRlJTIwQ2FrZXxlbnwwfDB8fHwxNzYxMzc4MzQ0fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        tags: ['best seller', 'chocolate'],
      },
      {
        id: 'c2',
        name: 'Strawberry Shortcake',
        description: 'Vanilla sponge layered with fresh cream and strawberries.',
        price: 39.5,
        image:
          'https://images.unsplash.com/photo-1602663491496-73f07481dbea?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHJhd2JlcnJ5JTIwU2hvcnRjYWtlfGVufDB8MHx8fDE3NjEzNzgxNDh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        tags: ['light', 'fruity'],
      },
      {
        id: 'c3',
        name: 'Red Velvet',
        description: 'Velvety cocoa layers with classic cream cheese frosting.',
        price: 36.0,
        image:
          'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBWZWx2ZXR8ZW58MHwwfHx8MTc2MTM3ODM0NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        tags: ['signature'],
      },
      {
        id: 'c4',
        name: 'Lemon Zest Cake',
        description: 'Citrus-infused sponge with tangy lemon curd.',
        price: 32.0,
        image:
          'https://images.unsplash.com/photo-1605316826323-cf818ba72e6c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMZW1vbiUyMFplc3QlMjBDYWtlfGVufDB8MHx8fDE3NjE0MDE5MDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        tags: ['fresh', 'citrus'],
      },
    ],
    []
  );

  // Load user and cart from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCart(true);
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const handleAuthSubmit = async ({ mode, name, email, password }) => {
    // Mock auth. Replace with real API later.
    await new Promise((r) => setTimeout(r, 500));
    if (mode === 'register') {
      setUser({ id: crypto.randomUUID(), name, email });
    } else {
      setUser({ id: crypto.randomUUID(), name: email.split('@')[0], email });
    }
    setShowAuth(false);
  };

  const logout = () => setUser(null);

  const openCheckout = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (cart.length === 0) return;
    setShowCheckout(true);
    setShowCart(false);
  };

  const processPayment = async () => {
    // Mock payment flow.
    await new Promise((r) => setTimeout(r, 1000));
    const orderId = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    clearCart();
    setShowCheckout(false);
    alert(`Payment successful! Your order ${orderId} is confirmed.`);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar
        user={user}
        onLogin={() => setShowAuth(true)}
        onLogout={logout}
        onOpenCart={() => setShowCart(true)}
        cartCount={cart.reduce((a, c) => a + c.qty, 0)}
      />

      <section id="hero" className="relative h-[80vh] md:h-[92vh]">
        <HeroCover onShop={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} />
      </section>

      <main className="relative z-0">
        <section id="products" className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Cakes</h2>
            <p className="text-neutral-600 mt-2">Freshly baked, beautifully designed, and delivered with care.</p>
          </div>
          <ProductGrid products={products} onAddToCart={addToCart} />
        </section>
      </main>

      <CartSidebar
        open={showCart}
        onClose={() => setShowCart(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        subtotal={subtotal}
        onCheckout={openCheckout}
      />

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} onSubmit={handleAuthSubmit} />

      <CheckoutPanel
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={cart}
        subtotal={subtotal}
        user={user}
        onPay={processPayment}
      />

      <footer className="border-t bg-neutral-50/50">
        <div className="container mx-auto px-4 py-10 text-sm text-neutral-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SweetLayer Cakes. All rights reserved.</p>
          <p className="opacity-80">Secure checkout powered by modern payment gateways.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

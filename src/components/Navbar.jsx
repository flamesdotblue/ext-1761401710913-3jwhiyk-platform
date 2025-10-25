import { ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';

function Navbar({ user, onLogin, onLogout, onOpenCart, cartCount }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-orange-500 to-rose-500" />
          <span className="font-semibold tracking-tight">SweetLayer</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <a href="#products" className="hover:text-neutral-900">Shop</a>
          <a href="#" className="hover:text-neutral-900">Custom Orders</a>
          <a href="#" className="hover:text-neutral-900">About</a>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-100">
                <UserIcon size={16} className="text-neutral-600" />
                <span className="text-sm text-neutral-700 max-w-[140px] truncate">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-neutral-50"
                aria-label="Logout"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="rounded-md border px-3 py-2 text-sm hover:bg-neutral-50"
            >
              Sign in
            </button>
          )}
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-3 py-2 text-sm hover:bg-neutral-800"
            aria-label="Open cart"
          >
            <ShoppingCart size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-orange-500 text-white text-xs grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

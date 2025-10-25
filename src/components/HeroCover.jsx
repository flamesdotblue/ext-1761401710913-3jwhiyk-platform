import Spline from '@splinetool/react-spline';

function HeroCover({ onShop }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/90 pointer-events-none" />

      <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border px-3 py-1 text-xs text-neutral-700 mb-4">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Secure payments, fast delivery
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            Celebrate every moment with exquisite cakes
          </h1>
          <p className="mt-4 text-neutral-700 md:text-lg">
            From birthdays to weddings, our artisanal cakes are handcrafted with premium ingredients and finished with elegance.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onShop}
              className="rounded-md bg-neutral-900 text-white px-5 py-3 text-sm md:text-base hover:bg-neutral-800"
            >
              Shop Cakes
            </button>
            <a
              href="#products"
              className="rounded-md border px-5 py-3 text-sm md:text-base hover:bg-neutral-50"
            >
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCover;

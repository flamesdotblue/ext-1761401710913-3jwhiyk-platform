import { Plus } from 'lucide-react';

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold tracking-tight">{product.name}</h3>
            <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{product.description}</p>
          </div>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags?.map((t) => (
            <span key={t} className="text-xs rounded-full bg-neutral-100 px-2 py-1 text-neutral-700">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => onAdd(product)}
          className="mt-4 inline-flex items-center gap-2 rounded-md w-full justify-center bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800"
        >
          <Plus size={16} /> Add to cart
        </button>
      </div>
    </div>
  );
}

function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;

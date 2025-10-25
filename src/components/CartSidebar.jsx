import { X, Plus, Minus } from 'lucide-react';

function LineItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex gap-3">
      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium leading-tight">{item.name}</h4>
            <p className="text-xs text-neutral-600">${item.price.toFixed(2)}</p>
          </div>
          <button onClick={() => onRemove(item.id)} className="text-neutral-500 hover:text-neutral-900">
            Remove
          </button>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={() => onUpdateQty(item.id, item.qty - 1)}
            className="h-8 w-8 grid place-items-center rounded-md border hover:bg-neutral-50"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm w-6 text-center">{item.qty}</span>
          <button
            onClick={() => onUpdateQty(item.id, item.qty + 1)}
            className="h-8 w-8 grid place-items-center rounded-md border hover:bg-neutral-50"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ open, onClose, items, onUpdateQty, onRemove, subtotal, onCheckout }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!open}
      >
        <div className="h-16 px-5 border-b flex items-center justify-between">
          <h3 className="font-semibold">Your Cart</h3>
          <button className="p-2 rounded-md hover:bg-neutral-50" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 h-[calc(100%-8rem)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-neutral-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-5">
              {items.map((i) => (
                <LineItem key={i.id} item={i} onUpdateQty={onUpdateQty} onRemove={onRemove} />
              ))}
            </div>
          )}
        </div>
        <div className="h-16 border-t px-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-600">Subtotal</p>
            <p className="font-semibold">${subtotal.toFixed(2)}</p>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="rounded-md bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartSidebar;

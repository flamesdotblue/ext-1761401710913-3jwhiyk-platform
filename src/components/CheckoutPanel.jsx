import { X, CreditCard } from 'lucide-react';

function Line({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-600">{label}</span>
      <span className={strong ? 'font-semibold' : ''}>{value}</span>
    </div>
  );
}

function CheckoutPanel({ open, onClose, items, subtotal, user, onPay }) {
  const delivery = subtotal > 60 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + delivery + tax;

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-16 px-5 border-b flex items-center justify-between">
          <h3 className="font-semibold">Checkout</h3>
          <button className="p-2 rounded-md hover:bg-neutral-50" onClick={onClose} aria-label="Close checkout">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6 h-[calc(100%-8rem)] overflow-y-auto">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Contact</h4>
            <p className="text-sm text-neutral-700">{user?.name} · {user?.email}</p>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-3">Order Summary</h4>
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="h-12 w-12 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{i.name}</p>
                    <p className="text-xs text-neutral-600">Qty {i.qty}</p>
                  </div>
                  <p className="text-sm">${(i.price * i.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Line label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Line label="Delivery" value={delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`} />
              <Line label="Tax" value={`$${tax.toFixed(2)}`} />
              <div className="pt-2 border-t">
                <Line label="Total" value={`$${total.toFixed(2)}`} strong />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Payment</h4>
            <p className="text-sm text-neutral-600 mb-3">Use test card 4242 4242 4242 4242 · 12/34 · 123</p>
            <button
              onClick={onPay}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 text-white px-4 py-3 text-sm hover:bg-neutral-800"
            >
              <CreditCard size={16} /> Pay now securely
            </button>
          </div>
        </div>

        <div className="h-16 border-t px-5 flex items-center justify-between text-sm text-neutral-600">
          <span>Encrypted and secured checkout</span>
          <div className="flex -space-x-2">
            <span className="h-6 w-10 rounded bg-neutral-200 inline-block" />
            <span className="h-6 w-10 rounded bg-neutral-200 inline-block" />
            <span className="h-6 w-10 rounded bg-neutral-200 inline-block" />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CheckoutPanel;

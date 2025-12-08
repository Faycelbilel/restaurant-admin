import { OrderApiResponse } from "../../services/api.types";

interface OrderModalProps {
  order: OrderApiResponse | null;
  open: boolean;
  onClose: () => void;
}

export function OrderModal({ order, open, onClose }: OrderModalProps) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>

        <div className="flex items-center gap-4 mb-4">
          {order.restaurantIcon && (
            <img
              src={order.restaurantIcon}
              alt={order.restaurantName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold">{order.restaurantName}</p>
            <p className="text-sm text-gray-500">{order.restaurantAddress}</p>
            <p className="text-sm text-gray-500">{order.restaurantPhone}</p>
          </div>
        </div>

        <div className="mb-4 space-y-1">
          <p>
            <strong>Client:</strong> {order.clientName}
          </p>
          <p>
            <strong>Rider:</strong> {order.delivery?.driver?.name || "N/A"}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
          </p>
          <p>
            <strong>Total Amount:</strong> {order.amount.toFixed(2)} TND
          </p>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Items:</p>
          <ul className="space-y-1">
            {(order.items ?? []).map((item) => (
              <li key={item.menuItemId} className="flex justify-between">
                <span>
                  {item.menuItemName} x{item.quantity}
                  {item.extras.length > 0 && ` (+${item.extras.join(", ")})`}
                  {item.specialInstructions && ` - ${item.specialInstructions}`}
                </span>
                <span>{item.lineTotal.toFixed(2)} TND</span>
              </li>
            ))}
          </ul>
        </div>

        {order.payment && (
          <div className="mt-4 border-t pt-4 space-y-1">
            <p>
              <strong>Subtotal:</strong> {order.payment.subtotal.toFixed(2)} TND
            </p>
            <p>
              <strong>Total:</strong> {order.payment.total.toFixed(2)} TND
            </p>
            {order.payment.deliveryFee && (
              <p>
                <strong>Delivery Fee:</strong>{" "}
                {order.payment.deliveryFee.toFixed(2)} TND
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

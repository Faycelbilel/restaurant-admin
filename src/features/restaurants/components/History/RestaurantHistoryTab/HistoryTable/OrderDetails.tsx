// components/OrderModal.tsx
import React from "react";
import { MenuItem, OrderApiResponse } from "../../services/api.types";

interface OrderModalProps {
  order: OrderApiResponse | null;
  open: boolean;
  onClose: () => void;
}

export function OrderModal({ order, open, onClose }: OrderModalProps) {
  if (!open || !order) return null;

  console.log("Raw order object:", order);
  console.log("order.items:", order.items);

  const restaurantName =
    order.restaurant?.name || order.restaurantName || "Unknown Restaurant";
  const restaurantAddress =
    order.restaurant?.address || order.restaurantAddress || "";
  const restaurantPhone =
    order.restaurant?.phone || order.restaurantPhone || "";
  const restaurantIcon =
    order.restaurant?.iconUrl ||
    order.restaurantIcon ||
    order.restaurant?.imageUrl ||
    order.restaurantImage;

  const clientName = order.client?.name || order.clientName || "Unknown Client";
  const riderName = order.delivery?.driver?.name || order.riderName || null;

  const firstOrderItem = order.items?.[0];
  const deliveryAddress =
    firstOrderItem?.deliveryAddress ??
    order.savedAddress?.formattedAddress ??
    order.delivery?.address ??
    "—";

  const totalAmount = order.payment?.total ?? order.amount ?? 0;

  const menuItems: MenuItem[] = React.useMemo(
    () => order.items ?? [],
    [order.items]
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4">
      {/* Full screen overlay with opacity */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-xl font-bold">
            Order #{order.orderId || order.id || "N/A"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Restaurant Info */}
          <div className="flex items-start gap-4">
            {restaurantIcon ? (
              <img
                src={restaurantIcon}
                alt={restaurantName}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{restaurantName}</h3>
              {restaurantAddress && (
                <p className="text-sm text-gray-600">{restaurantAddress}</p>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Client:</span> {clientName}
            </p>
            {riderName && (
              <p>
                <span className="font-medium">Rider:</span> {riderName}
              </p>
            )}
            <p>
              <span className="font-medium">Delivery Address:</span>{" "}
              {deliveryAddress}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  order.status === "DELIVERED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "CANCELED" ||
                        order.status === "REJECTED" ||
                        order.status === "PREPARING"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status || "Unknown"}
              </span>
            </p>
          </div>

          {/* Order Items */}
          <div>
            <h4 className="font-semibold mb-3">Order Items</h4>
            {menuItems.length > 0 ? (
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start p-3 bg-gray-50 rounded"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.quantity || 1} ×{" "}
                        {item.menuItemName || "Unnamed item"}
                      </p>
                      {item.extras && item.extras.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          + {item.extras.join(", ")}
                        </p>
                      )}
                      {item.specialInstructions && (
                        <p className="text-xs text-gray-500 italic mt-1">
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>
                    <p className="font-semibold text-right ml-4">
                      {(item.lineTotal || 0).toFixed(2)} TND
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No order items available (Common for canceled or incomplete
                orders)
              </p>
            )}
          </div>

          {/* Payment Summary */}
          {order.payment && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{(order.payment.subtotal || 0).toFixed(2)} TND</span>
              </div>
              {order.payment.deliveryFee != null && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>{order.payment.deliveryFee.toFixed(2)} TND</span>
                </div>
              )}
              {order.payment.serviceFee != null && (
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>{order.payment.serviceFee.toFixed(2)} TND</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{(order.payment.total || 0).toFixed(2)} TND</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

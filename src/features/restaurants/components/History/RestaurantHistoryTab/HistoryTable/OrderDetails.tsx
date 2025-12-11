import React from "react";
import { MenuItem, OrderApiResponse } from "../../services/api.types";
import { useAuth } from "@/shared";

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
  const { restaurant } = useAuth();
  const commission = restaurant?.commissionRate ?? 0;

  const computedTotalWithCommission = React.useMemo(() => {
    const orderTotal = order.payment?.itemsTotal ?? 0;
    const couponDiscount = order.payment?.couponDiscount ?? 0;

    const adjustedTotal = orderTotal - couponDiscount;
    const commissionAmount = adjustedTotal * commission;
    const tvaAmount = commissionAmount * 0.19;

    const total = adjustedTotal - (commissionAmount + tvaAmount);
    return +total.toFixed(2);
  }, [order.payment?.itemsTotal, order.payment?.couponDiscount, commission]);

  const menuItems: MenuItem[] = React.useMemo(
    () => order.items ?? [],
    [order.items]
  );

  // Calculate totals from items - use lineTotal which is the final item price
  const itemsTotal = menuItems.reduce(
    (sum, item) => sum + (item.lineTotal || 0),
    0
  );
  const totalExtras = menuItems.reduce(
    (sum, item) => sum + (item.extrasTotal || 0),
    0
  );
  const totalDiscounts = menuItems.reduce(
    (sum, item) => sum + (item.promotionDiscount || 0),
    0
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
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

        <div className="p-6 space-y-6">
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

          <div>
            <h4 className="font-semibold mb-3">Order Items</h4>
            {menuItems.length > 0 ? (
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.quantity || 1} ×{" "}
                          {item.menuItemName || "Unnamed item"}
                        </p>
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

                    <div className="mt-2 pl-4 space-y-1 text-xs text-gray-600 border-l-2 border-gray-300">
                      <div className="flex justify-between">
                        <span>
                          Base price ({item.quantity || 1} ×{" "}
                          {(item.unitBasePrice || 0).toFixed(2)} TND)
                        </span>
                        <span>{(item.lineSubtotal || 0).toFixed(2)} TND</span>
                      </div>

                      {item.extras && item.extras.length > 0 && (
                        <>
                          <div className="flex justify-between text-blue-600">
                            <span>Extras: {item.extras.join(", ")}</span>
                            <span>
                              +{(item.extrasTotal || 0).toFixed(2)} TND
                            </span>
                          </div>
                        </>
                      )}

                      {item.promotionDiscount != null &&
                        item.promotionDiscount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>
                              -{item.promotionDiscount.toFixed(2)} TND
                            </span>
                          </div>
                        )}

                      {(item.unitPrice !== item.unitBasePrice ||
                        (item.extrasTotal || 0) > 0 ||
                        (item.promotionDiscount || 0) > 0) && (
                        <div className="flex justify-between font-medium text-gray-800 pt-1 border-t border-gray-300">
                          <span>Item Total</span>
                          <span>{(item.lineTotal || 0).toFixed()} TND</span>
                        </div>
                      )}
                    </div>
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

          {order.payment && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{computedTotalWithCommission.toFixed(3)} TND</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

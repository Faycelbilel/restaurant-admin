"use client";

import { useParams } from "next/navigation";
import { RestaurantHistoryTab } from "./RestaurantHistoryTab";

export default function RestaurantHistoryPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  return <RestaurantHistoryTab restaurantId={restaurantId} />;
}

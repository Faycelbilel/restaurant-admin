export interface RestaurantMenuItem {
  id: string;
  name: string;
  price: string;
  isAvailable: boolean;
  category: string;
  imageUrl?: string;
  description?: string;
}

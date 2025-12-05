import type { RestaurantMenuItem } from "../../types/interfaces/RestaurantMenuItem";

export interface MenuItemCardProps {
  item: RestaurantMenuItem;
  onClick?: (item: RestaurantMenuItem) => void;
  onEdit?: (item: RestaurantMenuItem) => void;
  onDelete?: (item: RestaurantMenuItem) => Promise<void>;
  onToggleAvailability?: (item: RestaurantMenuItem) => void;
}

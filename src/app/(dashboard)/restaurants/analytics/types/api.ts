export type AnalyticsPeriod = 'today' | 'week' | 'month';

export interface AnalyticsOverviewValue {
  current: number;
  previous: number;
  change: number;
  percentageChange: number;
}

export interface AnalyticsOverviewPreparationTime {
  currentMinutes: number;
  previousMinutes: number;
  changeMinutes: number;
  percentageChange: number;
}

export interface AnalyticsOverviewRating {
  currentStars: number;
  previousStars: number;
  changeStars: number;
  percentageChange: number;
}

export interface AnalyticsOverviewResponse {
  period: AnalyticsPeriod;
  revenue: AnalyticsOverviewValue;
  orders: AnalyticsOverviewValue;
  preparationTime: AnalyticsOverviewPreparationTime;
  rating: AnalyticsOverviewRating;
}

export interface AnalyticsSalesTrendPoint {
  date: string;
  revenue: number;
  orderCount: number;
}

export interface AnalyticsSalesTrendResponse {
  period: AnalyticsPeriod;
  data: AnalyticsSalesTrendPoint[];
}

export interface AnalyticsTopDish {
  menuItemId: number;
  menuItemName: string;
  orderCount: number;
  quantitySold: number;
}

export interface AnalyticsTopDishesResponse {
  period: AnalyticsPeriod;
  topDishes: AnalyticsTopDish[];
}

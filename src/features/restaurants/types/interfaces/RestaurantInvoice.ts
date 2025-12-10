export interface RestaurantInvoice {
  id: number;
  invoiceNumber: string;
  invoiceUrl: string;
  restaurantId: number;
  restaurantName: string;
  receivedAmount: number;
  generationDate: string; // ISO date string YYYY-MM-DD
  emailSentAt: string; // ISO datetime string
  periodStartDate: string; // ISO date string YYYY-MM-DD
  periodEndDate: string; // ISO date string YYYY-MM-DD
}

/* eslint-disable @typescript-eslint/no-explicit-any */


export interface IOrder {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: number;
  country: string;
  created_at: string,
  price: number;
  payment_status: number;
  payment_method: string;
  payment_id: number;
  currency: string;
  status: number | string;
  order_product: any[];
}

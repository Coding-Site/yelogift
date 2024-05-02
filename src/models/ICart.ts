import { IProduct } from "./IProduct";

export interface ICartItem {
  id: number;
  porduct: IProduct;
  quantity: number;
  price?: number;
}

export interface ICart {
  id: number;
  user_id: number;
  items: ICartItem[];
  totalPrice?: number;
}

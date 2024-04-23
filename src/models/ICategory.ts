import { IProduct } from "./IProduct";

export interface ICategory {
  id: number;
  name: string;
  icon: string;
  products? :IProduct[]
}

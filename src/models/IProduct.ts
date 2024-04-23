import { ICategory } from "./ICategory"
import { IProductPart } from "./IProductPart"

export interface IProduct {
  id: number,
  name: string,
  description: string,
  price: number,
  image: string,
  category_id: number,
  discount: number,
  category: ICategory,
  product_parts: IProductPart[]
}

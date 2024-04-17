import { ICategory } from "./ICategory";

export interface ICard {
  id: number
  name: string
  description: string
  price: number
  image: string
  title?: string
  dark?: boolean
  category_id?: number
  discount?: number
  category?: ICategory
}

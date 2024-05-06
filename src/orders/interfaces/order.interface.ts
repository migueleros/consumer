import { IProduct } from "./product.interface";

export interface IOrder {
    customerId: string;
    products: IProduct[];
}
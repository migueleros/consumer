import { IFinishedOrder } from "../interfaces/finished.interface";
import { IOrder } from "../interfaces/order.interface";
import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
    name: string;
    description: string;
    price: number;
}

export class OrderRecord implements IOrder {
    customerId: string;
    products: Product[];
}

export class FinishedOrder implements IFinishedOrder {
    customerId: string;
    orderId: string;
    total: number;
}
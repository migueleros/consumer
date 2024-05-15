import { paymentMethods } from "../enum/payment.enum";
import { IProduct } from "./product.interface";

export interface IPayment {
    idClient: number;
    paymentMethod: paymentMethods;
    product: IProduct[];
}
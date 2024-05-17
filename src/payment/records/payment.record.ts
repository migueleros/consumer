import { Column, Entity } from "typeorm";
import { IPayment } from "../interfaces/payment.interface";
import { paymentMethods } from "../enum/payment.enum";
import { IProduct } from "../interfaces/product.interface";

@Entity()
export class Payment implements IPayment {
    @Column()
    idClient: number;
    @Column()
    paymentMethod: paymentMethods;
    @Column()
    product: IProduct[];
}

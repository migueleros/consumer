import { Column, Entity } from "typeorm";
import { IPayment } from "../interfaces/payment.interface";

@Entity()
export class Payment implements IPayment {
    @Column()
    cpf: string;
}

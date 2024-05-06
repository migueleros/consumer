import { Injectable, Logger } from "@nestjs/common";
import { OrderRecord } from "./records/order.record";
import { v4 as uuidv4 } from "uuid";
import { OrdersProducer } from "./orders.producer";


@Injectable()
export class OrdersProcessor {
    constructor(
        private readonly ordersProducer: OrdersProducer,
    ) {}

    private readonly logger = new Logger();

    async process(order: OrderRecord) {
        const orderId = uuidv4();
        const total = order.products.reduce((acc, item) => acc + item.price, 0);

        await this.ordersProducer.produce({ customerId: order.customerId, orderId, total });
        this.logger.log(`[PROCESSOR] Processed order ${orderId} for customer ${order.customerId}`);
    }
}
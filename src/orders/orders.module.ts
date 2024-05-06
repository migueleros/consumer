import { Module } from "@nestjs/common";
import { OrdersProcessor } from "./orders.processor";
import { OrdersConsumer } from "./orders.consumer";
import { OrdersProducer } from "./orders.producer";

@Module({
    providers: [OrdersProcessor, OrdersConsumer, OrdersProducer]
})
export class OrdersModule {}
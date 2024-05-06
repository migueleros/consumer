import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka } from "kafkajs";
import { OrdersProcessor } from "./orders.processor";
import { OrderRecord } from "./records/order.record";

@Injectable()
export class OrdersConsumer implements OnApplicationShutdown, OnModuleInit {
    constructor(
        private readonly ordersProcessor: OrdersProcessor,
    ) {}

    async onModuleInit() {
        await this.consume();
    }

    private readonly logger = new Logger();

    private readonly kafka = new Kafka({
        brokers: ["localhost:9092"],
    });

    private readonly consumers: Consumer[] = [];

    async consume() {
        const consumer = this.kafka.consumer({ groupId: "orders-processor" });
        await consumer.connect();
        await consumer.subscribe({ topic: "orders-topic" });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString();
                const payload: OrderRecord = JSON.parse(value);
                
                this.logger.log(`[CONSUMER] Consumed order for customer ${payload.customerId}`);
                await this.ordersProcessor.process(payload);
            }
        });

        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}

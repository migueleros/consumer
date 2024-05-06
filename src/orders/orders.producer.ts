import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { FinishedOrder } from "./records/order.record";

@Injectable()
export class OrdersProducer implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: ["localhost:9092"],
    });

    private readonly logger = new Logger();

    private readonly producer: Producer = this.kafka.producer();

    async produce(order: FinishedOrder): Promise<void> {
        await this.producer.send({
            topic: "finished-orders",
            messages: [{value: JSON.stringify(order)}]
        });

        this.logger.log("[PRODUCER] Produced finished order with success");
    }

    async onModuleInit() {
        await this.producer.connect();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}
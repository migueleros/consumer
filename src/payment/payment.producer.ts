import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class PaymentProducer implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: ["localhost:9092"],
    });

    private readonly logger = new Logger();

    private readonly producer: Producer = this.kafka.producer();

    async produceAntifraud(cpf: number): Promise<void> {
        await this.producer.send({
            topic: "antifraud-check",
            messages: [{value: String(cpf)}]
        });

        this.logger.log(`[PRODUCER] Produced antifraud check for ${cpf} with success`);
    }

    async produceTest(antifraud: string): Promise<void> {
        await this.producer.send({
            topic: "payment-test",
            messages: [{value: antifraud}]
        });

        this.logger.log(`[PRODUCER] Sent antifraud result to test topic`);
    }

    async produceResult(result: string): Promise<void> {
        await this.producer.send({
            topic: "payment-result",
            messages: [{value: result}]
        });

        this.logger.log(`[PRODUCER] Sent payment result to results topic`);
    }

    async onModuleInit() {
        await this.producer.connect();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}
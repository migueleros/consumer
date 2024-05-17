import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka } from "kafkajs";
import { PaymentProducer } from "./payment.producer";
import { Payment } from "./records/payment.record";

@Injectable()
export class PaymentConsumer implements OnApplicationShutdown, OnModuleInit {
    constructor(
        private readonly paymentProducer: PaymentProducer,
    ) {}

    async onModuleInit() {
        await this.consumePayment();
        await this.consumeAntifraud();
    }

    private readonly logger = new Logger();

    private readonly kafka = new Kafka({
        brokers: ["localhost:9092"],
    });

    private readonly consumers: Consumer[] = [];

    async consumePayment() {
        const consumer = this.kafka.consumer({ groupId: "payment-consumer" });
        await consumer.connect();
        await consumer.subscribe({ topic: "payment-request" });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString();
                const payload: Payment = JSON.parse(value);
                
                this.logger.log(`[CONSUMER] Consumed payment for cpf ${payload.idClient}`);
                await this.paymentProducer.produceAntifraud(payload.idClient);
            }
        });

        this.consumers.push(consumer);
    }

    async consumeAntifraud() {
        const consumer = this.kafka.consumer({ groupId: "antifraud-consumer" });
        await consumer.connect();
        await consumer.subscribe({ topic: "antifraud-result" });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString();
                const payload = JSON.parse(value);

                this.logger.log(`[CONSUMER] Consumed antifraud result`);
                this.paymentProducer.produceTest(payload.isValid);
            }
        });

        this.consumers.push(consumer);
    }

    async consumeTest() {
        const consumer = this.kafka.consumer({ groupId: "payment-test" });
        await consumer.connect();
        await consumer.subscribe({ topic: "antifraud-result" });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString();

                this.logger.log(`[CONSUMER] Consumed payment test result`);
                this.paymentProducer.produceResult(value);
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

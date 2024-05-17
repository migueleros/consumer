import { Module } from "@nestjs/common";
import { PaymentConsumer } from "./payment.consumer";
import { PaymentProducer } from "./payment.producer";

@Module({
    providers: [PaymentConsumer, PaymentProducer]
})
export class PaymentModule {}

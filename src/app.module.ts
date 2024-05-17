import { Module } from "@nestjs/common";
import { PaymentModule } from "./payment/payment.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payment/records/payment.record";

@Module({
    imports: [
        PaymentModule,
        TypeOrmModule.forRoot({
            host: "",
            port: 0,
            username: "",
            password: "",
            database: "",
            entities: [ Payment ],
            charset: "SQL_Latin1_General_CP1_CI_AS",
            options: {
                encrypt: false
            }
        })
    ],
})
export class AppModule {}

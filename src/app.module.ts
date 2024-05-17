import { Module } from "@nestjs/common";
import { PaymentModule } from "./payment/payment.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payment/records/payment.record";

@Module({
    imports: [
        PaymentModule,
        TypeOrmModule.forRoot({
            host: "dpg-co7upesf7o1s738n3u5g-a.oregon-postgres.render.com",
            port: 5432,
            username: "dbecommerce_n9hn_user",
            password: "0Scqh1LQR7sKG1EYNBaBmx4VPWirvJtF",
            database: "dbecommerce_n9hn",
            entities: [ Payment ],
            charset: "SQL_Latin1_General_CP1_CI_AS",
            options: {
                encrypt: false
            }
        })
    ],
})
export class AppModule {}

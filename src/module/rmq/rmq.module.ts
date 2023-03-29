import { DynamicModule, Global, Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { IRMQOption } from "./interface/rmq-option.interface"
import { RmqService } from "./rmq.service"

// todo: not completed yet

@Global()
@Module({
    providers: [RmqService],
    exports: [RmqService],
})
export class RmqModule {
    static register({ queueName }: IRMQOption): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name: queueName,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>("RABBIT_MQ_URI")],
                                queue: queueName,
                            },
                        }),
                        inject: [ConfigService],
                    },
                ]),
            ],
            exports: [ClientsModule],
        }
    }
}

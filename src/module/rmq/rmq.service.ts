import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { RmqContext, RmqOptions, Transport } from "@nestjs/microservices"

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queueName: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>("RABBIT_MQ_URI")],
                queue: queueName,
                noAck,
                persistent: true,
            },
        }
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMessage = context.getMessage()
        channel.ack(originalMessage)
    }
}

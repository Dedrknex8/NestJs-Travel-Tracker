import { Injectable,type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    async onModuleInit() { //INITIALISE WHEN DATA IS DONNECTED
        await this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect() //DESTORY OR DISCONNECT AFTER CLOSING
    }

}

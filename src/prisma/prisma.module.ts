import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports : [PrismaService],//making sure this service is avalable in other module that wll import primsa module
})
export class PrismaModule {}

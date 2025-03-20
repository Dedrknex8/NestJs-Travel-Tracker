import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { config, env } from 'process';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sign } from 'crypto';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports  : [ConfigModule],
      useFactory : async(ConfigService : ConfigService)=>({
        secret : ConfigService.get<string>('JWT_SECERET') || 'JWT_SECRET',
        signOptions : {expiresIn : '1h'}
      }),
      inject : [ConfigService]
    }),
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports : [JwtModule,PassportModule]
})
export class AuthModule {}

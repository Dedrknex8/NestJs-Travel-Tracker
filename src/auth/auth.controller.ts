import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Registerdto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

//think it as routes and service as controller
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('regiser')
    async regiser(@Body() registerDto: Registerdto){
        return this.authService.register(registerDto)
    }
    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }
}

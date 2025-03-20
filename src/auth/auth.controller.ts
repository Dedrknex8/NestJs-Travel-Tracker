import { Body, Controller, Delete, Headers, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Registerdto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

    @Delete('delete')
    @UseGuards(JwtAuthGuard) // Ensure user is authenticated before deleting
    async deleteUser(@Headers('Authorization') token: string) {
        if (!token) {
            throw new Error('Token is required');
        }

        // Remove 'Bearer' prefix if present
        token = token.replace('Bearer ', '');
        return this.authService.deleteUser(token);
    }
}

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Registerdto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { log } from 'node:console';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { resourceLimits } from 'node:worker_threads';
@Injectable()
export class AuthService {
    constructor (
        private prisma : PrismaService,
        private jwtService : JwtService
    ){} 
    //handle new user registration
    async register(registerDto: Registerdto){
        const { email, password } = registerDto;
        //check if user if exits before
        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        });
        
        if(existingUser){
            throw new ConflictException('User already exists! Please try with other email')
        }

        //if not hash the passwd
        const hashedPassword = await bcrypt.hash(password, 10);
        //create the new user
        const newnlyCreatedUser = await this.prisma.user.create({
            data : {
                email,
                password:hashedPassword,
            }
        });
        //remove passwd form return object
        const {password: _, ...result} = newnlyCreatedUser
        return result;
    }  
    
    async login(loginDto : LoginDto){
        const {email,password} = loginDto;
        //first find the user with the unique email id

        const user = await this.prisma.user.findUnique({
            where : { email }
        });

        if(!user){
            throw new UnauthorizedException('Invalid credential. Please try again ! ');
        }

        const isPassword = await bcrypt.compare(password,user.password);
        
        if(!isPassword){
            throw new UnauthorizedException('Invalid credential. Please try again ! ');
        }

        //genearte a token
        const token = this.jwtService.sign({userId : user.id});

        const {password:_,...result} = user;

        return { ...result,token};
    }
}

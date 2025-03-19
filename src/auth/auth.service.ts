import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Registerdto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { log } from 'node:console';
@Injectable()
export class AuthService {
    constructor (
        private prisma : PrismaService
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
}

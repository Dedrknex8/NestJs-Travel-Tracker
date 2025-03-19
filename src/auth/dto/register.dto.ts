import {IsEmail,IsString,MinLength} from 'class-validator'

export class Registerdto{
    
    @IsEmail({}, {message  : 'Please provide a valid email address'})
    email: string;

    @IsString()
    @MinLength(6,{message: 'Password must be of 6 character'})
    password: string;
}
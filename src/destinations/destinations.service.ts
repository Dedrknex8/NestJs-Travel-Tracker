import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destiantion.dto';

@Injectable()
export class DestinationsService {
    constructor(private prisma : PrismaService){}

    async create(userId: number, createDestinationDto : CreateDestinationDto){
        return this.prisma.destination.create({
            data : {
                ...createDestinationDto,
                travelDate : new Date(createDestinationDto.travelDate).toISOString(),
                userId,
            }
        })
    }

    async findAll(userId:number){
        return this.prisma.destination.findMany({
            where : {userId}
        });
    }

    async findOne(userId:number,id:number){
        const destiantion = await  this.prisma.destination.findFirst({
            where : {id,userId}
        });

        if(!destiantion){
            throw new NotFoundException(`Destination is not available with this id ${id}`)
        }

        return destiantion;
    }
}

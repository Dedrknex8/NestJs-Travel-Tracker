import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destiantion.dto';
import { updateDto } from './dto/update-destination.dto';

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

    async deleteTravelPost(userId:number,id:number){
        const deleteTravel = await this.prisma.destination.delete({
            where  : { id,userId }
        })

        if(!deleteTravel){
            throw new NotFoundException(`Cannot deleted Post with this id ${id}`);
        }

        return deleteTravel;
    }
    async updateDestination(userId:number,id:number, updateDestinationDto : updateDto){
        const find = await this.findOne(userId,id) //this will use findOne by userid and id
        if(!find){
            throw new NotFoundException(`Cannot found post with this id : ${id}`)
        }
        console.log('updateDestinationDto:', updateDestinationDto);

        return this.prisma.destination.update({
            where : { id },
            data : updateDestinationDto,    
        })
    }
}

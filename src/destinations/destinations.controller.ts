import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destiantion.dto';
import { updateDto } from './dto/update-destination.dto';

@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
    constructor(private readonly destinationService : DestinationsService){}

    @Post()
    create(@Request() req, @Body() createDestinationDto: CreateDestinationDto){
        return this.destinationService.create(req.user.userId,createDestinationDto)
    }

    @Get()
    findAll(@Request() req){
        return this.destinationService.findAll(req.user.userId)
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id:String){
        return this.destinationService.findOne(req.user.userId,+id) 
    }   

    @Delete('/delete/:id')
    findDeleted(@Request() req, @Param('id') id:string){
        return this.destinationService.deleteTravelPost(req.user.userId,+id);
    }

    @Patch('/update/:id')
    findAndUpdate(@Request() req, @Param('id') id:string,@Body() updateDestinationDto:updateDto){
        return this.destinationService.updateDestination(req.user.userId,+id,updateDestinationDto);
    }
}

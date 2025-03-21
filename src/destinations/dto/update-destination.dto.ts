import { PartialType } from "@nestjs/mapped-types"
import { CreateDestinationDto } from "./create-destiantion.dto";

export class updateDto extends PartialType(CreateDestinationDto){}
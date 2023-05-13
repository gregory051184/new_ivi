import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateProfessionDto {
    @ApiProperty({example: "Режиссер", description: "Название профессии"})
    @IsString({message: 'Должно быть строкой'})
    @Length(1)
    name: string
}
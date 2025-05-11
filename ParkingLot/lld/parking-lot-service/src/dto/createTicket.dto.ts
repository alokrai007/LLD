import { IsDefined, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    @IsDefined()
    vehicleId: string;
}
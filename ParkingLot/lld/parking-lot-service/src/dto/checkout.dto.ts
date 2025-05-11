import { IsDefined, IsString } from "class-validator";

export class CheckoutDto{

    @IsString()
    @IsDefined()
    ticketId: string;

}
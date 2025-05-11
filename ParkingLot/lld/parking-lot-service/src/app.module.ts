import { Module } from '@nestjs/common';
import { ParkingLotController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingFeeEntity } from './entity/parkingFee.entity';
import { ParkingLotEntity } from './entity/parkingLot.entity';
import { ParkingSpotEntity } from './entity/parkingSpot.entity';
import { ParkingTicketEntity } from './entity/parkingTicket.entity';
import { ParkingLot } from './parkingLot.service';
//@ts-expect-error
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [ParkingFeeEntity, ParkingLotEntity, ParkingSpotEntity, ParkingTicketEntity],
      synchronize: true
    }
    ),
    TypeOrmModule.forFeature([ParkingFeeEntity, ParkingLotEntity, ParkingSpotEntity, ParkingTicketEntity])
  ],
  controllers: [ParkingLotController],
  providers: [AppService, ParkingLot],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { ParkingLotController } from './app.controller';
import { AppService } from './app.service';

describe('ParkingLotController', () => {
  let ParkingLotController: ParkingLotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ParkingLotController],
      providers: [AppService],
    }).compile();

    ParkingLotController = app.get<ParkingLotController>(ParkingLotController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ParkingLotController.getHello()).toBe('Hello World!');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Ticket } from '../../src/ticket/entities/ticket.entity';
import { User } from '../../src/user/entities/user.entity';
import { ResponseBookingDto } from './dto/response/response-booking.dto';

describe('TestBookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Booking),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Ticket),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  describe('Test Controller', () => {
    test('should be define', async () => {
      expect(controller).toBeDefined();
    });

    test('create ticket booking', async () => {
      const user = { id: 1 };
      const ticketId = '12345';
      const mockResponse: ResponseBookingDto = {
        id: '1',
        bookingTime: new Date(),
        confirmTime: new Date(),
        isConfirm: true,
        payTime: null,
        isPaid: false,
        otp: '123456',
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockResponse);

      // Act
      const result = await controller.create(user, ticketId);

      // Assert
      expect(service.create).toHaveBeenCalledWith(user, ticketId);
      expect(result).toEqual(mockResponse);
    });
  });

});

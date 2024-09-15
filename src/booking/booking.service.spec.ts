import { Test, TestingModule } from "@nestjs/testing";
import { BookingService } from "./booking.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../src/user/entities/user.entity";
import { Repository } from "typeorm";
import { Booking } from "./entities/booking.entity";
import { Ticket } from "../../src/ticket/entities/ticket.entity";

describe('TestBookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BookingService,
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

    service = module.get<BookingService>(BookingService);
  });

  describe('Test Service', () => {
    test('should be define', async () => {
      expect(service).toBeDefined();
    });
  });
});
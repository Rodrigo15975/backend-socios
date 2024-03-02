import { Controller } from '@nestjs/common';
import { PaySessionService } from '../services/pay_session.service';

@Controller('session')
export class PaySessionController {
  constructor(private readonly payServicesSession: PaySessionService) {}
  // Aca se enviara los pedidos para el servicio pay_session
}

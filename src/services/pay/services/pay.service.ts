import {
  Headers,
  Injectable,
  Post,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import Stripe from 'stripe';

@Injectable()
export class PayService {
  private readonly client: Stripe;

  constructor(private readonly config: ConfigService) {
    this.client = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
      typescript: true,
    });
  }
  // Obtener el client del stripe
  getClient(): Stripe {
    return this.client;
  }

  @Post('webhook')
  async webHook(
    // Extract el valor de la cabezera que envia stripe
    @Headers('stripe-signature') sig: string,
    // El cuerpo que envia stripe mediante Raw
    @Req() req: RawBodyRequest<Request>,
    // Respuesta
    @Res() res: Response,
  ) {
    // Se escucha el evento
    let event: Stripe.Event;
    try {
      event = this.client.webhooks.constructEvent(
        req.rawBody,
        sig,
        this.config.get('STRIPE_WEBHOOK_SECRET'),
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Evento session complete
    // Se pasa le tipo devento
    this.listenEvents(event);
    return;
  }

  private listenEvents(event: Stripe.Event) {
    console.log(event);
  }
}

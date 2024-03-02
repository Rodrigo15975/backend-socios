import { Injectable } from '@nestjs/common';
import { CreateOrder } from '../types/payTypes';
import { PayService } from './pay.service';
import Stripe from 'stripe';

@Injectable()
export class PaySessionService {
  constructor(private readonly payServices: PayService) {}

  // Obtener el client
  getClient(): Stripe {
    return this.payServices.getClient();
  }

  // Darle tipado CreateOrder
  async createOrder(createOrder: CreateOrder, success_url: string) {
    const client = this.getClient();
    const sessionClient = await client.checkout.sessions.create({
      success_url,
      // Pedidos
      line_items: [{}],
      mode: 'payment',
    });
  }
}

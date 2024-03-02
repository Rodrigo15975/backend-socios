import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { renderHtmlContent } from './html/Notification.html';

@Injectable()
export class EmailService {
  private readonly client: Resend;
  constructor(private readonly config: ConfigService) {
    this.client = new Resend(this.config.get('SECRET_KEY_RESEND'));
  }

  async sendNotificacion(email: string, name: string) {
    await this.client.emails.send({
      from: 'Artes-Pizarro <onboarding@resend.dev>',
      to: ['rodrigorumpler@gmail.com', email],
      subject: 'Compra Artes Pizarro',
      html: `${renderHtmlContent(name)}`,
    });
  }
}

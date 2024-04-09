import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiRucService {
  private readonly tokenAccess: string =
    this.configService.getOrThrow('TOKEN_ACCESS');
  private readonly urlApi: string =
    this.configService.getOrThrow('URL_API_RUC');
  constructor(private readonly configService: ConfigService) {}
  async getRuc(ruc: string) {
    try {
      const res = await fetch(`${this.urlApi}numero=${ruc}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.tokenAccess}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Error en la petición');
    }
  }
}

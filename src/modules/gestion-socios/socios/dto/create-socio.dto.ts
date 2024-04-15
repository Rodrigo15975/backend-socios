import { Transform } from 'class-transformer';
import { IsOptional, Matches } from 'class-validator';
import {
  generalValidation,
  messageValidation,
  transformDate,
} from 'src/common';

export class CreateSocioDto {
  @Matches(generalValidation.matchesRuc, {
    message: messageValidation.msgRuc,
  })
  ruc: string;

  @Matches(generalValidation.matchesRazonSocial, {
    message: `La razón social requerida `,
  })
  razon_social: string;

  @Matches(generalValidation.matchesDNI, {
    message: messageValidation.msgDNI,
  })
  dni: string;

  @IsOptional()
  @Matches(generalValidation.matchesPhones, {
    message: `El teléfono ${messageValidation.msgPhones}`,
  })
  telefono: string;

  @Matches(generalValidation.matchesEmail, {
    message: `${messageValidation.msgEmail}`,
  })
  correo: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El presentante legal ${messageValidation.msgLetras}`,
  })
  representante_legal: string;

  @Transform(({ value }) => transformDate(value))
  fecha_inicio_actividades: string;

  @Transform(({ value }) => transformDate(value))
  fecha_inscripcion: string;

  @Matches(generalValidation.matchesLetras, {
    message: `La actividad ${messageValidation.msgLetras}`,
  })
  actividad: string;

  @Matches(generalValidation.matchesPhones, {
    message: `El celular ${messageValidation.msgPhones}`,
  })
  celular: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El departamento ${messageValidation.msgLetras}`,
  })
  departamento: string;

  @Matches(generalValidation.matchesLetras, {
    message: `La provincia ${messageValidation.msgLetras}`,
  })
  provincia: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El distrito ${messageValidation.msgLetras}`,
  })
  distrito: string;

  @IsOptional()
  direccion1: string;

  @IsOptional()
  direccion2: string;

  @IsOptional()
  partida_registral: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: `El id usuario debe contener letras y numeros`,
  })
  id_usuario: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El sector ${messageValidation.msgLetras}`,
  })
  sector: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El tipo de socio ${messageValidation.msgLetras}`,
  })
  tipo_socio: string;
}

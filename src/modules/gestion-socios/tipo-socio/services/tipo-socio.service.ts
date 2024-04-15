import { HttpCode, Injectable } from '@nestjs/common';
import {
  CreateTipoSocioDto,
  PropsTipoSocioDto,
} from '../dto/create-tipo-socio.dto';
import { UpdateTipoSocioDto } from '../dto/update-tipo-socio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoSocio } from '../entities/tipo-socio.entity';
import { Model, Types } from 'mongoose';
import { HandleErrors } from 'src/common';
import { Socio } from '../../socios/entities/socio.entity';
import { env } from 'process';

@Injectable()
export class TipoSocioService {
  private readonly idDefaultTipoSocio = env.idDefaultTipoSocio;
  constructor(
    @InjectModel(TipoSocio.name)
    private readonly modelTipoSocio: Model<TipoSocio>,
    private readonly handlErros: HandleErrors,
    @InjectModel(Socio.name) private readonly modelSocios: Model<Socio>,
  ) {}

  async create(createTipoSocioDto: CreateTipoSocioDto) {
    const { socios } = createTipoSocioDto;
    if (socios.length === 0)
      this.handlErros.handleErrorsBadRequestException('Datos no encontrados');
    return await this.createTipoSocio(socios);
  }

  private async createTipoSocio(createTipoSocioDto: PropsTipoSocioDto[]) {
    // Como es un map, se tiene que resolver todo las promises por eso se usa all
    await Promise.all(
      createTipoSocioDto.map(
        async (socios) => await this.verifyTipoSocio(socios.socio),
      ),
    );
    return this.handlErros.handleSendMessage('Creación exitosa');
  }
  private async verifyTipoSocio(socio: string) {
    const existe = await this.modelTipoSocio.findOne({ socio });
    if (existe)
      this.handlErros.handleErrorsConflicException(
        `El tipo de socio ${socio.toLocaleUpperCase()} ya sé encuentra registrado`,
      );
    await this.modelTipoSocio.create({ socio });
  }

  async findAll() {
    return await this.modelTipoSocio.find().select(['_id', 'socio']);
  }

  async findByTipoSocio(socio: string) {
    const findSocio = await this.modelTipoSocio
      .findOne({ socio })
      .select(['_id']);
    if (!findSocio)
      this.handlErros.handleErrorsNotFoundException(
        'Tipo de Socio no encontrado',
      );
    return findSocio;
  }

  async update(id: string, updateTipoSocioDto: UpdateTipoSocioDto) {
    const socio = await this.modelTipoSocio.findByIdAndUpdate(
      id,
      updateTipoSocioDto,
      { new: true },
    );
    if (!socio) this.handlErros.handleSendMessage('Socio no registrado');

    return this.handlErros.handleSendMessage('Actualización correcta');
  }

  @HttpCode(204)
  async remove(id: string) {
    const docDefault = await this.modelTipoSocio.findById(
      this.idDefaultTipoSocio,
    );
    const socio = await this.modelTipoSocio.findByIdAndDelete(id);

    if (!socio)
      this.handlErros.handleErrorsNotFoundException('Socio no encontrado');

    await this.modelSocios
      .updateMany(
        { id_tipo_socio: new Types.ObjectId(id) },
        { $set: { id_tipo_socio: docDefault._id } },
      )
      .exec();

    this.handlErros.handleSendMessage('Eliminado correctamente');
  }
}

import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HandleErrors } from 'src/common';
import { Socio } from '../../socios/entities/socio.entity';
import {
  CreateActividadDto,
  PropsActividadDto,
} from '../dto/create-actividad.dto';
import { UpdateActividadDto } from '../dto/update-actividad.dto';
import { Actividad } from '../entities/actividad.entity';
import { env } from 'process';

@Injectable()
export class ActividadService {
  private readonly idDefault = env.idDefaultActividad;

  constructor(
    @InjectModel(Actividad.name)
    private readonly modelActividad: Model<Actividad>,
    @InjectModel(Socio.name) private readonly modelSocios: Model<Socio>,
    private readonly handleErros: HandleErrors,
  ) {}
  async create(createActividadDto: CreateActividadDto) {
    const { actividades } = createActividadDto;
    if (actividades.length === 0)
      this.handleErros.handleErrorsBadRequestException('Datos no encontrados');
    await this.createActividad(actividades);
  }

  private async createActividad(createActividadDto: PropsActividadDto[]) {
    // Como es un map, se tiene que resolver todo las promises por eso se usa all
    await Promise.all(
      createActividadDto.map(
        async (actividades) =>
          await this.verifyActividad(actividades.actividad),
      ),
    );
    return this.handleErros.handleSendMessage('Creación exitosa');
  }

  private async verifyActividad(actividad: string) {
    const findActividad = await this.modelActividad.findOne({ actividad });
    if (findActividad)
      this.handleErros.handleErrorsConflicException(
        `La actividad ${actividad.toLocaleUpperCase()} ya sé encuentra registrado`,
      );
    await this.modelActividad.create({ actividad });
  }
  private async existeActividad(id: string) {
    const findActividad = await this.modelActividad.findById(id);
    if (!findActividad)
      this.handleErros.handleErrorsNotFoundException('Actividad no encontrada');
  }

  async findAll() {
    return await this.modelActividad.find().select(['_id', 'actividad']);
  }

  async findOneByActividad(actividad: string) {
    const findActividad = await this.modelActividad
      .findOne({ actividad })
      .select(['_id']);
    if (!findActividad)
      this.handleErros.handleErrorsNotFoundException('Actividad no encontrada');
    return findActividad;
  }
  async update(id: string, updateActividadDto: UpdateActividadDto) {
    await this.existeActividad(id);
    await this.modelActividad.findByIdAndUpdate(id, updateActividadDto, {
      new: true,
    });
    this.handleErros.handleSendMessage('Actividad actualizada');
  }

  @HttpCode(204)
  async remove(id: string) {
    const docDefault = await this.modelActividad.findById(this.idDefault);
    await this.existeActividad(id);
    await this.modelActividad.findByIdAndDelete(id);

    await this.modelSocios
      .updateMany(
        { id_actividad: new Types.ObjectId(id) },
        { $set: { id_actividad: docDefault._id } },
      )
      .exec();

    this.handleErros.handleSendMessage('Actividad eliminada');
  }
}

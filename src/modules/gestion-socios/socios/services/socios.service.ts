import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { HandleErrors } from 'src/common';
import { ActividadService } from '../../actividad/services/actividad.service';
import { SectorService } from '../../sector/services/sector.service';
import { TipoSocioService } from '../../tipo-socio/services/tipo-socio.service';
import { CreateSocioDto } from '../dto/create-socio.dto';
import { UpdateSocioDto } from '../dto/update-socio.dto';
import { Socio } from '../entities/socio.entity';
import { UsuariosService } from 'src/modules/gestion-usuarios/usuarios/services/usuarios.service';

@Injectable()
export class SociosService {
  constructor(
    private readonly handleErros: HandleErrors,
    private readonly tipoSocioServices: TipoSocioService,
    private readonly sectorServices: SectorService,
    private readonly actividadServices: ActividadService,
    private readonly usuarioServices: UsuariosService,
    @InjectModel(Socio.name) private readonly modelSocio: Model<Socio>,
  ) {}

  async create(createSocioDto: CreateSocioDto) {
    const { actividad, tipo_socio, sector, id_usuario, ruc } = createSocioDto;

    // Verifica el ruc existente y manda una excepcion
    await this.verifyByRuc(ruc);

    const actividadFind = await this.findByActividad(actividad);
    const sectorFind = await this.findBySector(sector);
    const tipo_sociodFind = await this.findByTipoSocio(tipo_socio);
    const usuarioFind = await this.usuarioServices.findById(id_usuario);

    await this.modelSocio.create({
      ...createSocioDto,
      id_actividad: actividadFind._id,
      id_sector: sectorFind._id,
      id_tipo_socio: tipo_sociodFind._id,
      id_usuario: usuarioFind._id,
    });

    this.handleErros.handleSendMessage('Información registrada');
  }

  //
  async verifyByRuc(ruc: string) {
    const rucFind = await this.modelSocio.findOne({ ruc });
    if (rucFind)
      this.handleErros.handleErrorsConflicException(
        `El RUC ${ruc} ya sé encuentra registrado`,
      );
  }

  async findAll() {
    const pipeline: PipelineStage[] = [
      ...this.buildLookupStage('Tipo_socio', 'id_tipo_socio'),
      ...this.buildLookupStage('Sector', 'id_sector'),
      ...this.buildLookupStage('Actividad', 'id_actividad'),
      ...this.buildLookupStage('Usuario', 'id_usuario'),
      {
        $project: {
          _id: 1,
          ruc: 1,
          razon_social: 1,
          dni: 1,
          telefono: 1,
          correo: 1,
          representante_legal: 1,
          fecha_inicio_actividades: 1,
          fecha_inscripcion: 1,
          partida_registral: 1,
          provincia: 1,
          departamento: 1,
          distrito: 1,
          celular: 1,
          direccion1: 1,
          direccion2: 1,
          'id_usuario.dni': 1,
          'id_usuario.nombres': 1,
          'id_usuario.apellidos': 1,
          'id_tipo_socio.socio': 1,
          'id_sector.sector': 1,
          'id_actividad.actividad': 1,
        },
      },
    ];
    return await this.modelSocio.aggregate(pipeline);
  }

  private async findByTipoSocio(socio: string) {
    return await this.tipoSocioServices.findByTipoSocio(socio);
  }
  private async findByActividad(actividad: string) {
    return await this.actividadServices.findOneByActividad(actividad);
  }
  private async findBySector(sector: string) {
    return await this.sectorServices.findBySector(sector);
  }

  private buildLookupStage(from: string, as: string) {
    return [
      {
        $lookup: {
          from: from,
          localField: as,
          foreignField: '_id',
          as: as,
        },
      },
      { $unwind: { path: `$${as}`, preserveNullAndEmptyArrays: true } },
    ];
  }

  async update(id: string, updateSocioDto: UpdateSocioDto) {
    const { actividad, sector, tipo_socio } = updateSocioDto;

    const actividadFind = await this.findByActividad(actividad);
    const sectorFind = await this.findBySector(sector);
    const tipo_sociodFind = await this.findByTipoSocio(tipo_socio);

    const socio = await this.modelSocio.findByIdAndUpdate(
      id,
      {
        ...updateSocioDto,
        id_actividad: actividadFind._id,
        id_sector: sectorFind._id,
        id_tipo_socio: tipo_sociodFind._id,
      },
      {
        new: true,
      },
    );
    if (!socio)
      this.handleErros.handleErrorsNotFoundException('Socio no encontrado');
    this.handleErros.handleSendMessage('Información actualizada');
  }

  @HttpCode(204)
  async remove(id: string) {
    const socio = await this.modelSocio.findByIdAndDelete(id);
    if (!socio)
      this.handleErros.handleErrorsNotFoundException('Socio no encontrado');
    this.handleErros.handleSendMessage('Información eliminada');
  }
}

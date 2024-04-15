import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { HandleErrors } from 'src/common';
import { hashPassword } from 'src/common/utils/argon2/argonHash';
import { Socio } from 'src/modules/gestion-socios/socios/entities/socio.entity';
import { CargoService } from '../../cargo/services/cargo.service';
import { TipoUsuarioService } from '../../tipo_usuario/services/tipo_usuario.service';
import {
  CreateUsuarioDto,
  PropsCreateUsuarioDto,
} from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly handleErrors: HandleErrors,
    @InjectModel(Usuario.name) private readonly modelUsuario: Model<Usuario>,
    private readonly cargoServices: CargoService,
    private readonly tipoUsuarioServices: TipoUsuarioService,
    @InjectModel(Socio.name) private readonly modelSocios: Model<Socio>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const { usuarios } = createUsuarioDto;
    if (usuarios.length === 0)
      this.handleErrors.handleErrorsBadRequestException('Datos no encontrados');
    return await this.createUsuario(usuarios);
  }

  async findAll() {
    const pipeline: PipelineStage[] = [
      ...this.buildLookupStage('Tipo_usuario', 'id_tipo'),
      ...this.buildLookupStage('Cargo', 'id_cargo'),
      {
        $project: {
          dni: 1,
          apellidos: 1,
          telefono: 1,
          direccion: 1,
          nombres: 1,
          celular: 1,
          'id_cargo._id': 1,
          'id_cargo.cargo': 1,
          'id_tipo._id': 1,
          'id_tipo.tipo_usuario': 1,
        },
      },
    ];
    return await this.modelUsuario.aggregate(pipeline).exec();
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
  async findByDni(dni: string) {
    const findDni = await this.modelUsuario.findOne({ dni });

    if (!findDni)
      this.handleErrors.handleErrorsBadRequestException(
        'Verifique sus credenciales',
      );

    return findDni;
  }
  async findById(id: string) {
    const findUser = await this.modelUsuario.findById(id);
    if (!findUser)
      this.handleErrors.handleErrorsBadRequestException(
        'Usuario no encontrado',
      );
    return findUser;
  }

  async findByIdGetUsuarioProfile(id: string) {
    const findUser = await this.modelUsuario.findById(id);

    if (!findUser)
      this.handleErrors.handleErrorsBadRequestException(
        'Usuario no encontrado',
      );
    const pipeline: PipelineStage[] = [
      { $match: { _id: findUser._id } },
      ...this.buildLookupStage('Tipo_usuario', 'id_tipo'),
      ...this.buildLookupStage('Cargo', 'id_cargo'),
      {
        $project: {
          dni: 1,
          apellidos: 1,
          nombres: 1,
          celular: 1,
          direccion: 1,
          telefono: 1,
          'id_cargo.cargo': 1,
          'id_tipo.tipo_usuario': 1,
        },
      },
    ];
    const usuario = await this.modelUsuario.aggregate(pipeline);
    return usuario[0];
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const {
      cargo,
      tipo,
      apellidos,
      celular,
      direccion,
      dni,
      nombres,
      telefono,
    } = updateUsuarioDto;

    const cargoUsuario = await this.findOneCargo(cargo);
    const tipoUsuario = await this.findOneTipoUsuario(tipo);

    await this.updateUserReferences(id, cargoUsuario._id, tipoUsuario._id);

    await this.modelUsuario.findByIdAndUpdate(
      id,
      {
        $set: {
          apellidos,
          celular,
          direccion,
          dni,
          nombres,
          telefono,
        },
      },
      {
        new: true,
      },
    );

    this.handleErrors.handleSendMessage('Información actualizada');
  }
  async updateUserReferences(
    id: string,
    cargoId: Types.ObjectId,
    tipoId: Types.ObjectId,
  ) {
    // Actualizar las referencias del usuario con los nuevos IDs de cargo y tipo de usuario
    await this.modelUsuario.findByIdAndUpdate(
      id,
      { $set: { id_cargo: cargoId, id_tipo: tipoId } },
      { new: true },
    );
  }

  @HttpCode(204)
  async remove(id: string) {
    const usuario = await this.modelUsuario.findByIdAndDelete(id);
    if (!usuario)
      this.handleErrors.handleErrorsNotFoundException('Usuario no encontrado');

    await this.modelSocios
      .updateMany({ id_usuario: id }, { $set: { id_usuario: null } })
      .exec();

    this.handleErrors.handleSendMessage('Información eliminada');
  }

  private async findOneCargo(cargo: string) {
    return await this.cargoServices.findOneCargo(cargo);
  }
  private async findOneTipoUsuario(tipoUsuario: string) {
    return await this.tipoUsuarioServices.findByTipoUsuario(tipoUsuario);
  }

  private async createUsuario(createUsuarioDto: PropsCreateUsuarioDto[]) {
    // Como es un map, se tiene que resolver todo las promises por eso se usa all
    await Promise.all(
      createUsuarioDto.map(
        async (usuarios) => await this.verifyUsuario(usuarios),
      ),
    );
    this.handleErrors.handleSendMessage('Creación exitosa');
  }

  private async verifyUsuario(createUsuarioDto: PropsCreateUsuarioDto) {
    const { dni, cargo, tipo } = createUsuarioDto;

    const usuario = await this.modelUsuario.findOne({ dni });
    const cargoUsuario = await this.findOneCargo(cargo);

    const tipoUsuario = await this.findOneTipoUsuario(tipo);

    if (usuario)
      this.handleErrors.handleErrorsConflicException(
        `El usuario con el DNI ${usuario.dni} ya sé encuentra registrado`,
      );
    const contraseña = await hashPassword(createUsuarioDto.contraseña);

    await this.modelUsuario.create({
      ...createUsuarioDto,
      contraseña,
      id_cargo: cargoUsuario._id,
      id_tipo: tipoUsuario._id,
    });
  }
}

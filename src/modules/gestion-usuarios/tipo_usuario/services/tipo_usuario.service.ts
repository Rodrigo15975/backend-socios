import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HandleErrors } from 'src/common';
import {
  CreateTipoUsuarioDto,
  PropsTipoUsuarioDto,
} from '../dto/create-tipo_usuario.dto';
import { TipoUsuario } from '../entities/tipo_usuario.entity';
import { UpdateTipoUsuarioDto } from '../dto/update-tipo_usuario.dto';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { env } from 'process';

@Injectable()
export class TipoUsuarioService {
  private readonly idDefault = env.idDefaultTipoUsuario;
  constructor(
    @InjectModel(TipoUsuario.name)
    private readonly modelTipoUsuario: Model<TipoUsuario>,
    @InjectModel(Usuario.name) private readonly modelUsuarios: Model<Usuario>,
    private readonly handlErros: HandleErrors,
  ) {}
  async create(createTipoUsuarioDto: CreateTipoUsuarioDto) {
    const { tipos_usuarios } = createTipoUsuarioDto;

    if (tipos_usuarios.length === 0)
      this.handlErros.handleErrorsBadRequestException('Datos no encontrados');
    return await this.createTipoUsuario(tipos_usuarios);
  }

  async findAll() {
    // Solo seleccionamos el tipo y el id suficiente
    return await this.modelTipoUsuario.find().select(['tipo_usuario', '_id']);
  }

  async findByTipoUsuario(tipo_usuario: string) {
    return await this.modelTipoUsuario.findOne({ tipo_usuario });
  }

  async findOne(id: string) {
    await this.existeTipoUsuario(id);
    return await this.modelTipoUsuario
      .findById(id)
      .select(['_id', 'tipo_usuario']);
  }
  async update(id: string, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    // Solo verifica si existe o no
    await this.existeTipoUsuario(id);
    await this.modelTipoUsuario.findByIdAndUpdate(id, updateTipoUsuarioDto, {
      new: true,
    });
    return this.handlErros.handleSendMessage('Actualización correcta');
  }
  @HttpCode(204)
  async remove(id: string) {
    const docDefault = await this.modelTipoUsuario.findById(this.idDefault);
    await this.existeTipoUsuario(id);
    // Buscar siempre con el typesObjectId si no no valdar
    await this.modelUsuarios
      .updateMany(
        { id_tipo: new Types.ObjectId(id) },
        { $set: { id_tipo: docDefault._id } },
      )
      .exec();
    await this.modelTipoUsuario.findByIdAndDelete(id);
    this.handlErros.handleSendMessage('Removido correctamente');
  }

  private async createTipoUsuario(createTipoUsuario: PropsTipoUsuarioDto[]) {
    // Como es un map, se tiene que resolver todo las promises por eso se usa all
    await Promise.all(
      createTipoUsuario.map(
        async (tipos) => await this.verifyTipoUsuario(tipos.tipo_usuario),
      ),
    );
    return this.handlErros.handleSendMessage('Creación exitosa');
  }
  // Verifica si existe
  private async verifyTipoUsuario(tipo_usuario: string) {
    const existe = await this.modelTipoUsuario.findOne({ tipo_usuario });
    if (existe)
      this.handlErros.handleErrorsConflicException(
        `El tipo de usuario ${tipo_usuario.toLocaleUpperCase()} ya sé encuentra registrado`,
      );
    await this.modelTipoUsuario.create({ tipo_usuario });
  }
  // Verifica si no existe
  private async existeTipoUsuario(id: string) {
    const findTipo = await this.modelTipoUsuario.findById(id);
    if (!findTipo)
      this.handlErros.handleErrorsNotFoundException(
        'Tipo de usuario no encontrado',
      );
  }
}

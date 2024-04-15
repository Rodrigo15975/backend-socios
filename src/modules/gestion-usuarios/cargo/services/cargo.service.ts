import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CreateCargoDto, PropsCreateCargoDto } from '../dto/create-cargo.dto';
import { UpdateCargoDto } from '../dto/update-cargo.dto';
import { Cargo } from '../entities/cargo.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { env } from 'process';

@Injectable()
export class CargoService {
  private readonly idDefault = env.idDefaultCargo;
  constructor(
    @InjectModel(Usuario.name) private readonly modelUsuarios: Model<Usuario>,
    private readonly handleErros: HandleErrors,
    @InjectModel(Cargo.name) private readonly modelCargo: Model<Cargo>,
  ) {}
  async create(createCargoDto: CreateCargoDto) {
    const { cargos } = createCargoDto;
    if (cargos.length === 0)
      this.handleErros.handleErrorsBadRequestException('Datos no encontrados');
    return await this.createCargo(cargos);
  }

  async findAll() {
    return await this.modelCargo.find().select(['_id', 'cargo']);
  }

  // Cambiar si necesita este findOne, el id por el cargo para encontrar
  async findOneCargo(cargo: string) {
    return await this.modelCargo.findOne({ cargo });
  }

  async update(id: string, updateCargoDto: UpdateCargoDto) {
    // Solo verifica si existe o no
    await this.existeCargo(id);
    await this.modelCargo.findByIdAndUpdate(id, updateCargoDto, {
      new: true,
    });
    return this.handleErros.handleSendMessage('Actualización correcta');
  }

  @HttpCode(204)
  async remove(id: string) {
    const docDefault = await this.modelCargo.findById(this.idDefault);

    await this.existeCargo(id);

    // Buscar siempre con el typesObjectId si no no valdar
    await this.modelUsuarios.updateMany(
      { id_cargo: new Types.ObjectId(id) },
      { $set: { id_cargo: docDefault._id } },
    );
    await this.modelCargo.findByIdAndDelete(id);
    return this.handleErros.handleSendMessage('Removido correctamente');
  }

  private async createCargo(createCargo: PropsCreateCargoDto[]) {
    // Como es un map, se tiene que resolver todo las promises por eso se usa all
    await Promise.all(
      createCargo.map(async (cargos) => await this.verifyCargo(cargos.cargo)),
    );
    return this.handleErros.handleSendMessage('Creación exitosa');
  }

  // Verificar si existe
  private async verifyCargo(cargo: string) {
    const existe = await this.modelCargo.findOne({ cargo });
    if (existe)
      this.handleErros.handleErrorsConflicException(
        `El tipo de cargo ${cargo.toLocaleUpperCase()} ya sé encuentra registrado`,
      );
    await this.modelCargo.create({ cargo });
  }
  // Verifica si no existe
  private async existeCargo(id: string) {
    const findCargo = await this.modelCargo.findById(id);
    if (!findCargo)
      this.handleErros.handleErrorsNotFoundException(
        'Tipo de cargo no encontrado',
      );
  }
}

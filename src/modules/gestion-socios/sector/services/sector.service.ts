import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { Model, Types } from 'mongoose';
import { HandleErrors } from 'src/common';
import { Socio } from '../../socios/entities/socio.entity';
import { CreateSectorDto, PropsSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { Sector } from '../entities/sector.entity';
import { env } from 'process';

@Injectable()
export class SectorService {
  private readonly idDefault = env.idDefaultSector;

  constructor(
    private readonly handleErros: HandleErrors,
    @InjectModel(Sector.name) private readonly modelSector: Model<Sector>,
    @InjectModel(Socio.name) private readonly modelSocios: Model<Socio>,
  ) {}
  async create(createSectorDto: CreateSectorDto) {
    const { sectores } = createSectorDto;
    if (sectores.length === 0)
      this.handleErros.handleErrorsBadRequestException('Datos no encontrados');
    await this.createSector(sectores);
  }
  private async createSector(createSectorDto: PropsSectorDto[]) {
    // Como es un map, se tiene que resolver todo las promises por eso se usa all
    await Promise.all(
      createSectorDto.map(
        async (sectores) => await this.verifySector(sectores.sector),
      ),
    );
    return this.handleErros.handleSendMessage('Creación exitosa');
  }
  private async verifySector(sector: string) {
    const findSector = await this.modelSector.findOne({ sector });
    if (findSector)
      this.handleErros.handleErrorsConflicException(
        `El sector ${sector.toLocaleUpperCase()} ya sé encuentra registrado`,
      );
    await this.modelSector.create({ sector });
  }

  async findAll() {
    return await this.modelSector.find().select(['_id', 'sector']);
  }

  async findBySector(sector: string) {
    const findSector = await this.modelSector
      .findOne({ sector })
      .select(['_id']);
    if (!findSector)
      this.handleErros.handleErrorsNotFoundException('Sector no registrado');
    return findSector;
  }

  async update(id: string, updateSectorDto: UpdateSectorDto) {
    const findSector = await this.modelSector.findByIdAndUpdate(
      id,
      updateSectorDto,
      { new: true },
    );
    if (!findSector)
      this.handleErros.handleErrorsNotFoundException('Sector no registrado');
    this.handleErros.handleSendMessage('Sector actualizado');
  }

  @HttpCode(204)
  async remove(id: string) {
    const docDefault = await this.modelSector.findById(this.idDefault);
    const sector = await this.modelSector.findByIdAndDelete(id);
    if (!sector)
      this.handleErros.handleErrorsNotFoundException('Sector no registrado');

    await this.modelSocios
      .updateMany(
        { id_sector: new Types.ObjectId(id) },
        { $set: { id_sector: docDefault._id } },
      )
      .exec();

    this.handleErros.handleSendMessage(
      'Sector eliminado',
      HttpStatusCode.Accepted,
    );
  }
}

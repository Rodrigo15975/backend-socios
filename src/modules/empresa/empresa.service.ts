import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(
    private readonly handleErrors: HandleErrors,
    @InjectModel(Empresa.name) private readonly modelEmpresa: Model<Empresa>,
  ) {}
  async create(createEmpresaDto: CreateEmpresaDto) {
    const { ruc } = createEmpresaDto;
    const empresa = await this.modelEmpresa.findOne({ ruc }).exec();
    if (empresa)
      this.handleErrors.handleErrorsConflicException(
        'La empresa ya sé encuentra registrada',
      );
    await this.modelEmpresa.create({
      ...createEmpresaDto,
      isRegisterEmpresa: true,
    });
    this.handleErrors.handleSendMessage('Información registrada correctamente');
  }
  async update(updateEmpresaDto: UpdateEmpresaDto, id: string) {
    const empresa = await this.modelEmpresa.findById(id);
    if (!empresa)
      this.handleErrors.handleErrorsNotFoundException('Empresa no encontrada');
    await this.modelEmpresa.findByIdAndUpdate(empresa, updateEmpresaDto, {
      new: true,
    });
    return this.handleErrors.handleSendMessage('Actualización correcta');
  }

  async findAll() {
    return await this.modelEmpresa.findOne();
  }

  async updateLogo(logo: string, id_logo: string) {
    await this.modelEmpresa.updateOne({ logo, id_logo });
    return this.handleErrors.handleSendMessage(
      'Imagen subida correctamente',
      HttpStatusCode.Accepted,
    );
  }

  async findOne(id: string) {
    const findEmpresa = await this.modelEmpresa.findById(id);
    if (!findEmpresa)
      this.handleErrors.handleErrorsNotFoundException(
        'Empresa no encontrada, ingrese sus datos en el formulario',
      );
    return findEmpresa;
  }

  @HttpCode(204)
  async remove(id: string) {
    const empresa = await this.modelEmpresa.findById(id);
    if (!empresa)
      this.handleErrors.handleErrorsNotFoundException('Empresa no encontrada');
    await this.modelEmpresa.findByIdAndDelete(id);
    return this.handleErrors.handleSendMessage('Información eliminada');
  }
}

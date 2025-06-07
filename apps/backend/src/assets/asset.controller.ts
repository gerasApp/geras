import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { Asset } from './asset.model';
import { CreateAssetDto } from './dto/create-asset.dto';

@ApiTags('assets')
@Controller('assets')
@UsePipes(new ValidationPipe({ transform: true }))
export class AssetController {
  constructor(private readonly assetService: AssetService) {
    // Verificar dependencias al iniciar
    try {
      require('class-validator');
      require('class-transformer');
    } catch (error) {
      console.error(`
        ⚠️  Dependencias faltantes para la validación de datos.
        Por favor, instale las siguientes dependencias:
        
        pnpm add class-validator class-transformer --filter backend
        
        O ejecute:
        npm install class-validator class-transformer
      `);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los activos' })
  @ApiResponse({ status: 200, description: 'Lista de activos obtenida exitosamente' })
  async getAllAssets() {
    try {
      const assets = await this.assetService.getAllAssets();
      return assets;
    } catch (error: any) {
      return {
        error: error.message || 'Error al obtener los activos'
      };
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo activo' })
  @ApiResponse({ status: 201, description: 'Activo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    try {
      const newAsset = await this.assetService.createAsset(createAssetDto);
      return newAsset;
    } catch (error: any) {
      return {
        error: error.message || 'Error al crear el activo'
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un activo por ID' })
  @ApiResponse({ status: 200, description: 'Activo encontrado' })
  @ApiResponse({ status: 404, description: 'Activo no encontrado' })
  async getAssetById(@Param('id') id: string) {
    try {
      const asset = await this.assetService.getAssetById(id);
      if (!asset) {
        return { error: 'Activo no encontrado' };
      }
      return asset;
    } catch (error: any) {
      return {
        error: error.message || 'Error al obtener el activo'
      };
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un activo' })
  @ApiResponse({ status: 200, description: 'Activo actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Activo no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async updateAsset(@Param('id') id: string, @Body() createAssetDto: CreateAssetDto) {
    try {
      const updated = await this.assetService.updateAsset(id, createAssetDto);
      if (!updated) {
        return { error: 'Activo no encontrado' };
      }
      return updated;
    } catch (error: any) {
      return {
        error: error.message || 'Error al actualizar el activo'
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un activo' })
  @ApiResponse({ status: 200, description: 'Activo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Activo no encontrado' })
  async deleteAsset(@Param('id') id: string) {
    try {
      const deleted = await this.assetService.deleteAsset(id);
      if (!deleted) {
        return { error: 'Activo no encontrado' };
      }
      return { message: 'Activo eliminado exitosamente' };
    } catch (error: any) {
      return {
        error: error.message || 'Error al eliminar el activo'
      };
    }
  }
} 
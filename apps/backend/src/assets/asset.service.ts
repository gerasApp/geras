import { Injectable } from '@nestjs/common';
import { Asset, AssetType, RiskLevel } from './asset.model';

@Injectable()
export class AssetService {
  private assets: Map<string, Asset> = new Map();
  private nextId = 1;

  private generateId(): string {
    return (this.nextId++).toString();
  }

  private validateAssetData(data: Partial<Asset>): void {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      throw new Error('El nombre del activo es requerido y debe ser una cadena válida');
    }

    const validTypes = Object.values(AssetType);
    if (!data.type || !validTypes.includes(data.type)) {
      throw new Error(`El tipo de activo debe ser uno de: ${validTypes.join(', ')}`);
    }

    if (typeof data.historicalReturn !== 'number' || data.historicalReturn < 0) {
      throw new Error('El retorno histórico debe ser un número no negativo');
    }

    const validRisks = Object.values(RiskLevel);
    if (!data.risk || !validRisks.includes(data.risk)) {
      throw new Error(`El nivel de riesgo debe ser uno de: ${validRisks.join(', ')}`);
    }
  }

  async getAllAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async createAsset(assetData: Partial<Asset>): Promise<Asset> {
    this.validateAssetData(assetData);

    const id = this.generateId();
    const timestamp = new Date();
    const asset: Asset = {
      _id: id,
      name: assetData.name!,
      type: assetData.type!,
      historicalReturn: assetData.historicalReturn!,
      risk: assetData.risk!,
      description: assetData.description,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.assets.set(id, asset);
    return asset;
  }

  async getAssetById(id: string): Promise<Asset | null> {
    return this.assets.get(id) || null;
  }

  async updateAsset(id: string, assetData: Partial<Asset>): Promise<Asset | null> {
    const existing = this.assets.get(id);
    if (!existing) return null;

    this.validateAssetData(assetData);

    const updated: Asset = {
      ...existing,
      ...assetData,
      _id: id,
      updatedAt: new Date()
    };

    this.assets.set(id, updated);
    return updated;
  }

  async deleteAsset(id: string): Promise<boolean> {
    return this.assets.delete(id);
  }
} 
import { Injectable } from "@nestjs/common";
import { Asset, AssetType, RiskLevel } from "./asset.model";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAssetDto, UpdateAssetDto } from "@geras/types";

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async getAllAssets(): Promise<Asset[]> {
    const assets = await this.prisma.asset.findMany();
    return assets.map(asset => ({
      id: asset.id,
      name: asset.name,
      type: asset.type as AssetType,
      historicalReturn: asset.historicalReturn,
      risk: asset.risk as RiskLevel,
      description: asset.description || undefined,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));
  }

  async createAsset(assetData: CreateAssetDto): Promise<Asset> {
    this.validateAssetData(assetData);

    const asset = await this.prisma.asset.create({
      data: {
        name: assetData.name,
        type: assetData.type as any,
        historicalReturn: assetData.historicalReturn,
        risk: assetData.risk as any,
        description: assetData.description
      }
    });

    return {
      id: asset.id,
      name: asset.name,
      type: asset.type as AssetType,
      historicalReturn: asset.historicalReturn,
      risk: asset.risk as RiskLevel,
      description: asset.description || undefined,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    };
  }

  async getAssetById(id: number): Promise<Asset | null> {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset) return null;
    
    return {
      id: asset.id,
      name: asset.name,
      type: asset.type as AssetType,
      historicalReturn: asset.historicalReturn,
      risk: asset.risk as RiskLevel,
      description: asset.description || undefined,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    };
  }

  async updateAsset(
    id: number,
    assetData: UpdateAssetDto,
  ): Promise<Asset | null> {
    const existing = await this.prisma.asset.findUnique({ where: { id } });
    if (!existing) return null;

    this.validateAssetData(assetData);

    const updated = await this.prisma.asset.update({
      where: { id },
      data: {
        ...assetData,
        type: assetData.type as any,
        risk: assetData.risk as any,
        updatedAt: new Date()
      }
    });

    return {
      id: updated.id,
      name: updated.name,
      type: updated.type as AssetType,
      historicalReturn: updated.historicalReturn,
      risk: updated.risk as RiskLevel,
      description: updated.description || undefined,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    };
  }

  async deleteAsset(id: number): Promise<boolean> {
    try {
      await this.prisma.asset.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  private validateAssetData(data: Partial<Asset>): void {
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length === 0
    ) {
      throw new Error(
        "El nombre del activo es requerido y debe ser una cadena válida",
      );
    }

    const validTypes = Object.values(AssetType);
    if (!data.type || !validTypes.includes(data.type)) {
      throw new Error(
        `El tipo de activo debe ser uno de: ${validTypes.join(", ")}`,
      );
    }

    if (
      typeof data.historicalReturn !== "number" ||
      data.historicalReturn < 0
    ) {
      throw new Error("El retorno histórico debe ser un número no negativo");
    }

    const validRisks = Object.values(RiskLevel);
    if (!data.risk || !validRisks.includes(data.risk)) {
      throw new Error(
        `El nivel de riesgo debe ser uno de: ${validRisks.join(", ")}`,
      );
    }
  }
}

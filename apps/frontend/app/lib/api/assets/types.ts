export enum AssetType {
  STOCK = "STOCK",
  BOND = "BOND",
  ETF = "ETF",
  CRYPTO = "CRYPTO",
  MUTUAL_FUND = "MUTUAL_FUND",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  historicalReturn: number;
  risk: RiskLevel;
  description: string;
  createdAt: string;
  updatedAt: string;
  planId?: number;
  userId?: string;
}

export interface CreateAssetDto {
  name: string;
  type: AssetType;
  historicalReturn: number;
  risk: RiskLevel;
  description: string;
  planId?: number;
  userId?: string;
}

export type UpdateAssetDto = Partial<CreateAssetDto>;

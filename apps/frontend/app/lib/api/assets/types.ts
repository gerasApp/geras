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
  _id: string;
  name: string;
  type: AssetType;
  historicalReturn: number;
  risk: RiskLevel;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetDto {
  name: string;
  type: AssetType;
  historicalReturn: number;
  risk: RiskLevel;
  description: string;
}

export interface UpdateAssetDto extends Partial<CreateAssetDto> {}

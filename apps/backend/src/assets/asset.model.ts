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
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  planId?: number;
}

export type AssetDocument = Asset;

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
  id: string;
  name: string;
  type: AssetType;
  riskLevel: RiskLevel;
  description?: string;
  symbol?: string; // Ticker symbol for stocks, ETFs, etc.
  market?: string; // Market or exchange where the asset is traded
  createdAt?: Date;
  updatedAt?: Date;
  planId?: number;
  userId?: string;
}

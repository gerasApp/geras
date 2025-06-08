import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AssetDocument = Asset & Document;

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

@Schema()
export class Asset {
  @Prop()
  _id?: string;

  @Prop({
    required: [true, "El nombre del activo es requerido"],
    trim: true,
  })
  name!: string;

  @Prop({
    required: [true, "El tipo de activo es requerido"],
    enum: Object.values(AssetType),
    uppercase: true,
  })
  type!: AssetType;

  @Prop({
    required: [true, "El retorno histórico es requerido"],
    min: [0, "El retorno histórico no puede ser negativo"],
  })
  historicalReturn!: number;

  @Prop({
    required: [true, "El nivel de riesgo es requerido"],
    enum: Object.values(RiskLevel),
    uppercase: true,
  })
  risk!: RiskLevel;

  @Prop({ trim: true })
  description?: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

// Middleware para actualizar updatedAt antes de cada save
AssetSchema.pre("save", function (this: AssetDocument, next: () => void) {
  this.updatedAt = new Date();
  next();
});

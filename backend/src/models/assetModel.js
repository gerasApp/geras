const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del activo es requerido'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'El tipo de activo es requerido'],
    enum: ['STOCK', 'BOND', 'ETF', 'CRYPTO', 'MUTUAL_FUND'],
    uppercase: true
  },
  historicalReturn: {
    type: Number,
    required: [true, 'El retorno histórico es requerido'],
    min: [0, 'El retorno histórico no puede ser negativo']
  },
  risk: {
    type: String,
    required: [true, 'El nivel de riesgo es requerido'],
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    uppercase: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt antes de cada save
assetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const AssetModel = mongoose.model('Asset', assetSchema);

module.exports = AssetModel; 
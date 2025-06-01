class InMemoryDb {
  constructor() {
    this.assets = new Map();
    this.nextId = 1;
  }

  /**
   * Genera un nuevo ID único
   * @returns {string} ID generado
   */
  generateId() {
    return (this.nextId++).toString();
  }

  /**
   * Guarda un documento en la colección
   * @param {Object} data - Datos a guardar
   * @returns {Object} Documento guardado con ID
   */
  save(data) {
    const id = this.generateId();
    const timestamp = new Date();
    const document = {
      _id: id,
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this.assets.set(id, document);
    return document;
  }

  /**
   * Encuentra todos los documentos
   * @returns {Array} Lista de documentos
   */
  findAll() {
    return Array.from(this.assets.values());
  }

  /**
   * Encuentra un documento por ID
   * @param {string} id - ID del documento
   * @returns {Object|null} Documento encontrado o null
   */
  findById(id) {
    return this.assets.get(id) || null;
  }

  /**
   * Actualiza un documento
   * @param {string} id - ID del documento
   * @param {Object} data - Datos a actualizar
   * @returns {Object|null} Documento actualizado o null
   */
  update(id, data) {
    const existing = this.assets.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      _id: id,
      updatedAt: new Date()
    };
    this.assets.set(id, updated);
    return updated;
  }

  /**
   * Elimina un documento
   * @param {string} id - ID del documento
   * @returns {boolean} true si se eliminó, false si no existía
   */
  delete(id) {
    return this.assets.delete(id);
  }
}

// Exportar una única instancia para toda la aplicación
module.exports = new InMemoryDb(); 
# Simulador de Inversiones

Este proyecto es un simulador de inversiones que permite a los usuarios calcular rendimientos de inversiones y gestionar diferentes tipos de activos financieros.

## Estructura del Proyecto

```
proyectoFinal/
├── backend/         # Servidor Express
├── frontend/        # Aplicación React
└── shared/         # Tipos y utilidades compartidas
```

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

### Backend

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`
La documentación de la API estará disponible en `http://localhost:3001/api-docs`

### Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Características

### Backend
- API RESTful con Express
- Base de datos en memoria para desarrollo rápido
- Documentación con Swagger
- Validación de datos
- Manejo de errores centralizado

### Frontend
- Interfaz de usuario moderna con React
- Formulario de simulación de inversiones
- Gestión de activos financieros
- Temas claro/oscuro
- Componentes reutilizables

## API Endpoints

### Simulaciones
- `POST /api/simulations/calculate` - Calcula una simulación de inversión

### Activos
- `GET /api/assets` - Obtiene todos los activos
- `POST /api/assets` - Crea un nuevo activo

## Configuración de Rutas

### Estado Actual
Actualmente, las rutas de la API están definidas en dos archivos:
- `frontend/src/shared/routes.js` - Configuración de rutas para el frontend
- `backend/src/routes/index.js` - Configuración de rutas para el backend

**Nota Importante:** Cualquier cambio en las rutas debe realizarse en ambos archivos para mantener la consistencia entre frontend y backend.

### Mejora Planificada
Se planea mejorar este sistema utilizando un paquete npm local compartido que contendrá todas las definiciones de rutas, eliminando así la duplicación y posibles inconsistencias. Esta mejora permitirá:
- Mantener un único punto de verdad para todas las rutas
- Garantizar la consistencia entre frontend y backend
- Facilitar el mantenimiento y las actualizaciones de rutas
- Proporcionar tipado y autocompletado en ambos proyectos

## Desarrollo

### Base de Datos
Actualmente, el proyecto utiliza una base de datos en memoria para desarrollo. Los datos se perderán al reiniciar el servidor.

### Documentación
La documentación completa de la API está disponible en la ruta `/api-docs` del backend.

## Estructura de Datos

### Simulación
```json
{
  "initialAmount": number,
  "monthlyContribution": number,
  "rate": number,
  "months": number
}
```

### Activo
```json
{
  "name": string,
  "type": "STOCK" | "BOND" | "ETF" | "CRYPTO" | "MUTUAL_FUND",
  "historicalReturn": number,
  "risk": "LOW" | "MEDIUM" | "HIGH",
  "description": string
}
```

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm (v10)
```bash
npm install -g pnpm@latest-10
```

## Estructura

```
proyectoFinal/
├── apps
    ├──backend/
    └── frontend/
└── packages/
```

### Apps y paquetes

- `frontend`: Frontend en [Next.js](https://nextjs.org/)
- `backend`: Backend con [Nest.js](https://nextjs.org/)
- `packages/eslint-config`: `eslint` Configuraciones de eslint
- `packages/typescript-config`: `tsconfig.json` Configuraciones de typescript
- `packages/shared`: Tipos y utilidades compartidas

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/dteplitz/proyectoFinal.git
cd proyectoFinal
```

2. Estando en el directorio raiz ejecutar:

```bash
pnpm install
```

## Ejecutar el proyecto

### 🚀 Servidor de desarrollo

Para iniciar el servidor de desarrollo:

```sh
pnpm dev
```

Esto inica tanto el Front como el Back.

El Front estará disponible en `http://localhost:3000`

El Backend estará disponible en `http://localhost:3001`

> [!TIP]
> Se pueden ejecutar las aplicaciones por separado ejecutando los scripts desde el directorio correspondiente: apps/backend o apps/frontend.
> Esto tambien aplica para los siguientes scripts

### 🛠️ Compilación (Build de producción)

Para compilar todas las apps y paquetes:

```sh
pnpm build
```

### 🧹 Linting

Para verificar errores de estilo y buenas prácticas:

```sh
pnpm lint
```

### 🧼 Formateo de código
Para aplicar el formateo automático:

```sh
pnpm format
```

### 🧪 Verificación de tipos

```sh
pnpm check-types
```

## Características

### Backend
- API RESTful con Nest
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

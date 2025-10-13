# Prueba Técnica - Frontend React

Aplicación React para gestión de cursos de blockchain con funcionalidades de favoritos y navegación.

## 🚀 Tecnologías

- **React 18** + TypeScript
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navegación
- **Axios** - HTTP client
- **Zod** - Validación de esquemas

## 📱 Características

- **3 pantallas**: Home (lista), Detail (detalle), Favorites (favoritos)
- **Diseño responsivo** con TailwindCSS
- **Componentes reutilizables**: CourseCard, LoadingSpinner, ErrorDisplay
- **Manejo de estado** con localStorage para favoritos
- **Validación de tipos** con Zod
- **Animaciones sutiles** y transiciones

## 🛠️ Instalación

```bash
# Clonar repositorio
git clone [tu-repo-url]
cd proyecto/front

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🏗️ Estructura del proyecto

```
src/
├── api/           # Llamadas HTTP
├── components/    # Componentes reutilizables
│   └── ui/       # Componentes UI base
├── pages/        # Páginas principales
├── types/        # Tipos y schemas Zod
├── layouts/      # Layouts de página
└── lib/          # Configuraciones
```

## 🎯 API Backend

Conecta con la API de prueba en: `http://localhost:3000`

Endpoints utilizados:
- `GET /courses` - Lista de cursos
- `POST /auth/login` - Autenticación

## 🧪 Funcionalidades implementadas

- ✅ Lista de cursos con paginación visual
- ✅ Detalle de curso individual
- ✅ Sistema de favoritos persistente
- ✅ Autenticación automática
- ✅ Estados de carga (spinners + skeletons)
- ✅ Manejo de errores contextual
- ✅ Navegación fluida entre vistas
- ✅ Componentes modulares y reutilizables

## 📊 Componentes principales

- **CourseCard**: Tarjeta reutilizable para cursos
- **LoadingSpinner**: Estados de carga configurables
- **SkeletonLoader**: Esqueletos de carga realistas
- **ErrorDisplay**: Manejo centralizado de errores

## 🎨 Decisiones técnicas

- **Zod**: Para validación type-safe de APIs
- **TailwindCSS**: Diseño consistente y responsive
- **Componentes modulares**: Reutilización y mantenibilidad
- **TypeScript**: Type safety en toda la aplicación
- **localStorage**: Persistencia de favoritos offline

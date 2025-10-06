# API REST - Cursos de Blockchain

API REST completa con autenticación JWT y CRUD de cursos de blockchain. Incluye seed de datos inicial.



## Requisitos (Debes tener instalado previamente Docker)

- Docker
- Docker Compose

##  Instalación y Ejecución

### 1. Realiza un fork de este proyecto, leugo clona el repositorio 
```bash
git clone <url-repositorio>
cd test-front-mobile
```

### 2. Levantar los servicios con Docker
```bash
docker-compose up --build
```

La API estará disponible en: `http://localhost:3000`

##  Endpoints

### Autenticación (Públicos)

#### Registrar usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "id": "...",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Obtener usuario actual
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Cursos (Protegidos - Requieren JWT)

#### Obtener todos los cursos
```http
GET /api/courses
Authorization: Bearer <token>
```

#### Obtener un curso por ID
```http
GET /api/courses/:id
Authorization: Bearer <token>
```

#### Crear nuevo curso
```http
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nuevo Curso de Blockchain",
  "description": "Descripción del curso",
  "instructor": "Nombre del instructor",
  "duration": 40,
  "level": "Principiante",
  "price": 99.99,
  "topics": ["Bitcoin", "Ethereum"],
  "enrolledStudents": 0,
  "rating": 0
}
```

#### Actualizar curso
```http
PUT /api/courses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título actualizado",
  "price": 149.99
}
```

#### Eliminar curso
```http
DELETE /api/courses/:id
Authorization: Bearer <token>
```

## Usuarios de Prueba (Seed)

Al iniciar el servicio, se crean automáticamente estos usuarios:

| Email | Password | Role |
|-------|----------|------|
| admin@blockchain.com | admin123 | admin |
| user@blockchain.com | user123 | user |

## Datos de Seed

El sistema incluye 8 cursos de blockchain precargados:
- Introducción a Blockchain
- Smart Contracts con Solidity
- DeFi: Finanzas Descentralizadas
- NFTs: Creación y Comercialización
- Desarrollo de DApps Full Stack
- Seguridad en Blockchain
- Tokenomics y Economía Cripto
- Blockchain para Empresas

## Autenticación

Todas las rutas de `/api/courses` están protegidas y requieren un token JWT válido.

Para acceder, incluye el token en el header:
```
Authorization: Bearer <tu_token_jwt>
```

## Modelo de Datos

### Course (Curso)
```javascript
{
  title: String,           // Título del curso
  description: String,     // Descripción
  instructor: String,      // Nombre del instructor
  duration: Number,        // Duración en horas
  level: String,          // Principiante | Intermedio | Avanzado
  price: Number,          // Precio del curso
  topics: [String],       // Temas del curso
  isActive: Boolean,      // Si está activo
  enrolledStudents: Number, // Estudiantes inscritos
  rating: Number,         // Calificación (0-5)
  createdAt: Date,
  updatedAt: Date
}
```

### User (Usuario)
```javascript
{
  name: String,
  email: String,
  password: String,       // Encriptada con bcrypt
  role: String,          // user | admin
  createdAt: Date,
  updatedAt: Date
}
```

## Variables de Entorno

Configuradas en `docker-compose.yml`:

```env
PORT=3000
MONGODB_URI=mongodb://mongo:27017/apirest
JWT_SECRET=mi_clave_secreta_jwt_2024
JWT_EXPIRE=24h
```

##  Estructura del Proyecto

```
prueba-tecnica/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── courseController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Course.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── courseRoutes.js
│   ├── seeds/
│   │   └── seedData.js
│   └── index.js
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Probar la API

Puedes usar herramientas como:
- **Postman**
- **Insomnia**
- **Thunder Client** (extensión de VS Code)
- **cURL**

### Ejemplo con cURL:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@blockchain.com","password":"user123"}'

# Obtener cursos (reemplaza <TOKEN> con el token recibido)
curl -X GET http://localhost:3000/api/courses \
  -H "Authorization: Bearer <TOKEN>"
```

## Licencia

ISC

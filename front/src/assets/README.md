# 🎨 Brand Assets - BlockchainEdu

## Logotipos Disponibles

### 📁 `/src/assets/`
- `logo.svg` - Logo principal (64x64px)
- `logo-small.svg` - Logo compacto (48x48px) 
- `logo-horizontal.svg` - Logo horizontal con texto (200x48px)

### 📁 `/public/`
- `favicon.svg` - Favicon para navegador (32x32px)

## 🎨 Diseño del Logo

### Concepto
El logo combina dos elementos clave:
- **Bloques de blockchain**: Representan la tecnología blockchain
- **Gorro de graduación**: Simboliza la educación y el aprendizaje

### Colores
```css
/* Gradiente principal */
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);

/* Colores individuales */
--indigo-500: #6366f1;
--purple-500: #8b5cf6;  
--pink-500: #ec4899;
```

## 📋 Uso Recomendado

### Logo Principal (`logo.svg`)
- Headers y navegación
- Páginas principales
- Elementos destacados

### Logo Compacto (`logo-small.svg`)
- Botones pequeños
- Elementos de UI compactos
- Iconos en listas

### Logo Horizontal (`logo-horizontal.svg`)
- Footers
- Documentación
- Presentaciones

### Favicon (`favicon.svg`)
- Pestaña del navegador
- Marcadores
- PWA icon

## 🔧 Implementación

### En React/TypeScript
```tsx
import logo from '@/assets/logo.svg';
import logoSmall from '@/assets/logo-small.svg';
import logoHorizontal from '@/assets/logo-horizontal.svg';

// Uso básico
<img src={logo} alt="BlockchainEdu" className="w-10 h-10" />

// Con hover effect
<img 
  src={logo} 
  alt="BlockchainEdu" 
  className="w-10 h-10 transition-transform hover:scale-105" 
/>
```

### En HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Logo en página -->
<img src="/src/assets/logo.svg" alt="BlockchainEdu Logo" />
```

## 🎯 Características Técnicas

- **Formato**: SVG (escalable sin pérdida de calidad)
- **Compatibilidad**: Todos los navegadores modernos
- **Tamaño**: Muy ligero (~2KB por archivo)
- **Responsive**: Se adapta automáticamente a cualquier tamaño
- **Accesible**: Incluye atributos alt y aria-label apropiados

## 🌟 Variaciones de Color

El logo funciona bien en:
- ✅ Fondos blancos y claros
- ✅ Fondos oscuros (el blanco resalta)
- ✅ Fondos con gradiente
- ✅ Diferentes tamaños (desde 16px hasta 200px+)

## 📱 Responsive Design

```css
/* Tamaños recomendados */
.logo-small { width: 24px; height: 24px; }    /* Mobile nav */
.logo-medium { width: 40px; height: 40px; }   /* Desktop nav */
.logo-large { width: 64px; height: 64px; }    /* Hero sections */
```

---

**🚀 Resultado**: Una identidad visual consistente y profesional para BlockchainEdu que refuerza el mensaje de educación tecnológica avanzada.
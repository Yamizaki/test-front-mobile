import type { Level } from '@/types/index';

/**
 * Formatea un precio numérico a moneda USD en formato español
 * @param price - El precio como número
 * @returns String formateado como moneda USD
 * @example formatPrice(29.99) // "$29,99"
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
};

/**
 * Colores de TailwindCSS para cada nivel de curso
 */
export const LEVEL_COLORS: Record<Level, string> = {
    'Principiante': 'bg-green-100 text-green-800 border-green-200',
    'Intermedio': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Avanzado': 'bg-red-100 text-red-800 border-red-200',
};

/**
 * Obtiene las clases CSS de TailwindCSS para el nivel especificado
 * @param level - El nivel del curso
 * @returns String con las clases CSS para el nivel
 * @example getLevelColor('Avanzado') // "bg-red-100 text-red-800 border-red-200"
 */
export const getLevelColor = (level: Level): string => {
    return LEVEL_COLORS[level] || LEVEL_COLORS['Principiante'];
};
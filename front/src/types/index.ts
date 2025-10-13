import { z } from 'zod';

// Schema para Level del curso
export const LevelSchema = z.enum(['Principiante', 'Intermedio', 'Avanzado']);

// Schema para Course
export const CourseSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    instructor: z.string(),
    duration: z.number().positive(),
    level: LevelSchema,
    price: z.number().min(0),
    topics: z.array(z.string()),
    enrolledStudents: z.number().min(0),
    rating: z.number().min(0).max(5),
    isActive: z.boolean().optional().default(true),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// Schema para Login Data (usado en AuthAPI)
export const LoginDataSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Schema para Login Response (usado en AuthAPI)
export const LoginResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        role: z.string(),
        token: z.string(),
    }),
});

// Schema para API Response genérica (usado en múltiples APIs)
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  count: z.number().optional(),
  error: z.string().optional(),
});

// Types 

export type Level = z.infer<typeof LevelSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type LoginData = z.infer<typeof LoginDataSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Tipo genérico para respuestas de API
export type ApiResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
    count?: number;
    error?: string;
};

// ========================================
// CONSTANTES COMPARTIDAS
// ========================================

export const COURSE_LEVELS: Level[] = ['Principiante', 'Intermedio', 'Avanzado'];
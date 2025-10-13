import api from "@/lib/axios";
import type { Course, ApiResponse } from "@/types/index";

// Obtener todos los cursos
export const getCourses = async (): Promise<ApiResponse<Course[]>> => {
    const response = await api.get('/courses');
    return response.data;
};

// Obtener un curso por ID
export const getCourseById = async (id: string): Promise<ApiResponse<Course>> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
};
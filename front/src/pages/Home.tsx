import { useEffect, useState, useRef } from "react";
import { getCourses } from "@/api/CourseAPI";
import { quickLogin, isAuthenticated } from "@/api/AuthAPI";
import type { Course } from "@/types/index";
import CourseCard from "@/components/CourseCard";
import { LoadingSpinner, SkeletonLoader, ErrorDisplay } from "@/components/ui";

export default function Home() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const hasRunRef = useRef(false);

    useEffect(() => {
        // Animación de entrada
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Cargar favoritos desde localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                const favoriteIds = parsedFavorites.map((course: Course) => course._id);
                setFavorites(favoriteIds);
            } catch {
                setFavorites([]);
            }
        }
    }, []);

    useEffect(() => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Verificar autenticación
                if (!isAuthenticated()) {
                    await quickLogin();
                }
                
                // Obtener cursos
                const coursesResponse = await getCourses();
                const coursesArray = coursesResponse.data || [];
                setCourses(coursesArray);

            } catch (error: any) {
                let errorMessage = 'Error desconocido';
                
                if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                    errorMessage = 'No se puede conectar al backend. ¿Está corriendo en puerto 3000?';
                } else if (error.response?.status === 404) {
                    errorMessage = 'Endpoint no encontrado';
                } else if (error.response?.status === 401) {
                    errorMessage = 'Error de autenticación';
                } else {
                    errorMessage = error.response?.data?.message || error.message;
                }
                
                setError(errorMessage);
            } finally {
                console.log(courses[0]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleFavorite = (course: Course) => {
        const savedFavorites = localStorage.getItem('favorites');
        let currentFavorites: Course[] = [];
        
        if (savedFavorites) {
            try {
                currentFavorites = JSON.parse(savedFavorites);
            } catch {
                currentFavorites = [];
            }
        }

        const isAlreadyFavorite = currentFavorites.some(fav => fav._id === course._id);
        
        if (isAlreadyFavorite) {
            // Remover de favoritos
            const updatedFavorites = currentFavorites.filter(fav => fav._id !== course._id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites.map(fav => fav._id));
        } else {
            // Agregar a favoritos
            const updatedFavorites = [...currentFavorites, course];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites.map(fav => fav._id));
        }
    };

    const isFavorite = (courseId: string) => {
        return favorites.includes(courseId);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <LoadingSpinner 
                    message="Cargando cursos de blockchain..." 
                    size="md" 
                    color="indigo"
                />
                <SkeletonLoader variant="grid" count={6} />
            </div>
        );
    }

    if (error) {
        // Determinar la variante según el tipo de error
        let variant: 'error' | 'not-found' | 'network' = 'error';
        if (error.includes('conectar') || error.includes('ECONNREFUSED') || error.includes('ERR_NETWORK')) {
            variant = 'network';
        } else if (error.includes('no encontrado') || error.includes('404')) {
            variant = 'not-found';
        }

        return (
            <ErrorDisplay
                error={error}
                title="Error al cargar cursos"
                mounted={mounted}
                variant={variant}
            />
        );
    }

    return (
        <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h1 className="text-4xl font-bold">Cursos de Blockchain</h1>
                </div>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Domina el futuro de la tecnología con nuestros cursos especializados en blockchain, criptomonedas y Web3
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{courses.length}</div>
                    <div className="text-indigo-700 font-medium">Cursos Disponibles</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                        {courses.reduce((acc, course) => acc + course.enrolledStudents, 0).toLocaleString()}
                    </div>
                    <div className="text-green-700 font-medium">Estudiantes Activos</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                        {courses.length > 0 ? (courses.reduce((acc, course) => acc + course.rating, 0) / courses.length).toFixed(1) : '0'}
                    </div>
                    <div className="text-purple-700 font-medium">Puntuación Promedio</div>
                </div>
            </div>

            {/* Courses Grid */}
            {!Array.isArray(courses) || courses.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay cursos disponibles</h3>
                    <p className="text-gray-500">Los cursos aparecerán aquí una vez que estén disponibles.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                            index={index}
                            onToggleFavorite={toggleFavorite}
                            isFavorite={isFavorite(course._id)}
                            variant="default"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
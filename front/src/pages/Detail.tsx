import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCourses } from '@/api/CourseAPI'
import { quickLogin, isAuthenticated } from '@/api/AuthAPI'
import type { Course } from "@/types/index";
import { formatPrice, getLevelColor } from "@/utils";
import { LoadingSpinner, SkeletonLoader, ErrorDisplay } from "@/components/ui";

export default function Detail() {
    const { id } = useParams()
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        // Animación de entrada
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true)
                setError(null)

                // Verificar autenticación
                if (!isAuthenticated()) {
                    await quickLogin()
                }

                // Obtener todos los cursos y filtrar por ID
                const coursesResponse = await getCourses()
                const courses = coursesResponse.data || []
                const foundCourse = courses.find((c: Course) => c._id === id)

                if (foundCourse) {
                    setCourse(foundCourse)
                    checkIfFavorite(foundCourse._id)
                } else {
                    setError('Curso no encontrado')
                }

            } catch (error: any) {
                let errorMessage = 'Error al cargar el curso'
                
                if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                    errorMessage = 'No se puede conectar al backend. ¿Está corriendo en puerto 3000?'
                } else if (error.response?.status === 404) {
                    errorMessage = 'Curso no encontrado'
                } else if (error.response?.status === 401) {
                    errorMessage = 'Error de autenticación'
                } else {
                    errorMessage = error.response?.data?.message || error.message
                }
                
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchCourse()
        }
    }, [id])

    const checkIfFavorite = (courseId: string) => {
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
            try {
                const favorites = JSON.parse(savedFavorites)
                setIsFavorite(favorites.some((fav: Course) => fav._id === courseId))
            } catch {
                setIsFavorite(false)
            }
        }
    }

    const toggleFavorite = () => {
        if (!course) return

        const savedFavorites = localStorage.getItem('favorites')
        let currentFavorites: Course[] = []
        
        if (savedFavorites) {
            try {
                currentFavorites = JSON.parse(savedFavorites)
            } catch {
                currentFavorites = []
            }
        }

        const isAlreadyFavorite = currentFavorites.some(fav => fav._id === course._id)
        
        if (isAlreadyFavorite) {
            // Remover de favoritos
            const updatedFavorites = currentFavorites.filter(fav => fav._id !== course._id)
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            setIsFavorite(false)
        } else {
            // Agregar a favoritos
            const updatedFavorites = [...currentFavorites, course]
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            setIsFavorite(true)
        }
    }

    if (loading) {
        return (
            <div className="space-y-8">
                <LoadingSpinner 
                    message="Cargando curso..." 
                    size="md" 
                    color="indigo"
                />
                <SkeletonLoader variant="detail" />
            </div>
        )
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
                title="Error al cargar el curso"
                mounted={mounted}
                showBackButton={true}
                backTo="/"
                backLabel="Volver al inicio"
                variant={variant}
            />
        )
    }

    if (!course) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Curso no encontrado</h3>
                <p className="text-gray-500 mb-6">El curso que buscas no existe o ha sido eliminado</p>
                <NavLink 
                    to="/" 
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                    Volver al inicio
                </NavLink>
            </div>
        )
    }

    return (
        <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600">
                <NavLink to="/" className="hover:text-indigo-600 transition-colors">
                    Cursos
                </NavLink>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium">{course.title}</span>
            </nav>

            {/* Header del curso */}
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                                {course.level}
                            </span>
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-500 text-lg">★</span>
                                <span className="font-semibold">{course.rating}</span>
                                <span className="text-gray-500">({course.enrolledStudents.toLocaleString()} estudiantes)</span>
                            </div>
                        </div>
                        
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {course.title}
                        </h1>
                        
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            {course.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                        <button
                            onClick={toggleFavorite}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                                isFavorite 
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
                        </button>
                        
                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-lg">
                            Inscribirse por {formatPrice(course.price)}
                        </button>
                    </div>
                </div>
            </div>

            {/* Información del curso */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
                    <svg className="w-8 h-8 text-indigo-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="text-lg font-semibold text-indigo-900 mb-1">Instructor</div>
                    <div className="text-indigo-700">{course.instructor}</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                    <svg className="w-8 h-8 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-lg font-semibold text-green-900 mb-1">Duración</div>
                    <div className="text-green-700">{course.duration} horas</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                    <svg className="w-8 h-8 text-purple-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="text-lg font-semibold text-purple-900 mb-1">Estudiantes</div>
                    <div className="text-purple-700">{course.enrolledStudents.toLocaleString()}</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                    <svg className="w-8 h-8 text-orange-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="text-lg font-semibold text-orange-900 mb-1">Nivel</div>
                    <div className="text-orange-700">{course.level}</div>
                </div>
            </div>

            {/* Temas del curso */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Qué aprenderás?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                    {course.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700">{topic}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <NavLink 
                    to="/" 
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a cursos
                </NavLink>
                
                <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
                    Inscribirse ahora - {formatPrice(course.price)}
                </button>
            </div>
        </div>
    )
}

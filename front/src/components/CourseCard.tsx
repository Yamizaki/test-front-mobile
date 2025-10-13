import { NavLink } from 'react-router-dom';
import type { Course } from '@/types/index';
import { formatPrice, getLevelColor } from '@/utils';

interface CourseCardProps {
    course: Course;
    index: number;
    onToggleFavorite: (course: Course) => void;
    isFavorite: boolean;
    variant?: 'default' | 'favorites';
    onRemove?: (courseId: string) => void;
}

export default function CourseCard({
    course,
    index,
    onToggleFavorite,
    isFavorite,
    variant = 'default',
    onRemove
}: CourseCardProps) {
    const isDefaultVariant = variant === 'default';
    const hoverColor = isDefaultVariant ? 'group-hover:text-indigo-600' : 'group-hover:text-pink-600';
    const buttonColor = isDefaultVariant ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-pink-600 hover:bg-pink-700';

    return (
        <div 
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group relative"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Botón de favorito/remover */}
            {isDefaultVariant ? (
                <button
                    onClick={() => onToggleFavorite(course)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isFavorite 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500'
                    }`}
                    title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
                >
                    <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            ) : (
                <button
                    onClick={() => onRemove?.(course._id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    title="Remover de favoritos"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}

            {/* Course Header */}
            <div className="mb-4">
                <div className={`flex items-start justify-between mb-3 ${isDefaultVariant ? 'pr-12' : 'pr-8'}`}>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors ${hoverColor}`}>
                    {course.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                    {course.description}
                </p>
            </div>

            {/* Course Info */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Instructor: <span className="font-medium">{course.instructor}</span></span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{course.duration} horas</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{course.enrolledStudents.toLocaleString()} estudiantes</span>
                </div>
            </div>

            {/* Topics */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {course.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {topic}
                        </span>
                    ))}
                    {course.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            +{course.topics.length - 3} más
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(course.price)}
                </div>
                <NavLink 
                    to={`/detail/${course._id}`}
                    className={`text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${buttonColor}`}
                >
                    Ver Detalles
                </NavLink>
            </div>
        </div>
    );
}

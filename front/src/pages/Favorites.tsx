import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import type { Course } from "@/types/index";
import { formatPrice } from "@/utils";
import CourseCard from "@/components/CourseCard";

export default function Favorites() {
    const [favorites, setFavorites] = useState<Course[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Animación de entrada
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Simular carga de favoritos desde localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch {
                setFavorites([]);
            }
        }
    }, []);

    const removeFavorite = (courseId: string) => {
        const updatedFavorites = favorites.filter(course => course._id !== courseId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const clearAllFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('favorites');
    };

    return (
        <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h1 className="text-4xl font-bold">Mis Favoritos</h1>
                </div>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Guarda y organiza los cursos que más te interesen para acceder a ellos fácilmente
                </p>
            </div>

            {/* Stats y acciones */}
            {favorites.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-pink-600">{favorites.length}</div>
                            <div className="text-sm text-gray-600">Cursos guardados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {formatPrice(favorites.reduce((acc, course) => acc + course.price, 0))}
                            </div>
                            <div className="text-sm text-gray-600">Valor total</div>
                        </div>
                    </div>
                    <button
                        onClick={clearAllFavorites}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                    >
                        Limpiar todo
                    </button>
                </div>
            )}

            {/* Lista de favoritos */}
            {favorites.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes cursos favoritos</h3>
                    <p className="text-gray-500 mb-6">Explora nuestros cursos y marca los que más te interesen</p>
                    <NavLink 
                        to="/" 
                        className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Explorar cursos
                    </NavLink>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((course, index) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                            index={index}
                            onToggleFavorite={() => {}} // No se usa en favorites
                            isFavorite={true} // Siempre true en favorites
                            variant="favorites"
                            onRemove={removeFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
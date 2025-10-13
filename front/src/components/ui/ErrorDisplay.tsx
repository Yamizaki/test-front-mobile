import { NavLink } from "react-router-dom";

interface ErrorDisplayProps {
    error: string;
    title?: string;
    onRetry?: () => void;
    showBackButton?: boolean;
    backTo?: string;
    backLabel?: string;
    mounted?: boolean;
    className?: string;
    variant?: 'error' | 'not-found' | 'network';
}

export default function ErrorDisplay({
    error,
    title,
    onRetry,
    showBackButton = false,
    backTo = "/",
    backLabel = "Volver al inicio",
    mounted = true,
    className = "",
    variant = 'error'
}: ErrorDisplayProps) {
    const handleRetry = () => {
        if (onRetry) {
            onRetry();
        } else {
            window.location.reload();
        }
    };

    // Configuración según variante
    const getVariantConfig = () => {
        switch (variant) {
            case 'not-found':
                return {
                    title: title || 'Recurso no encontrado',
                    icon: (
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5.9-6.134 2.366M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                        </svg>
                    )
                };
            case 'network':
                return {
                    title: title || 'Error de conexión',
                    icon: (
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                    )
                };
            default:
                return {
                    title: title || 'Error',
                    icon: (
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    )
                };
        }
    };

    const config = getVariantConfig();

    return (
        <div className={`text-center space-y-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'} ${className}`}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {config.icon}
                </div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">{config.title}</h2>
                <p className="text-red-700 mb-6">{error}</p>
                
                {/* Botones de acción */}
                <div className={`flex gap-4 ${showBackButton ? 'justify-center' : 'justify-center'}`}>
                    <button 
                        onClick={handleRetry}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                        Intentar de nuevo
                    </button>
                    
                    {showBackButton && (
                        <NavLink 
                            to={backTo}
                            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                        >
                            {backLabel}
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'indigo' | 'pink' | 'gray';
    className?: string;
}

export default function LoadingSpinner({ 
    message = "Cargando...", 
    size = 'md',
    color = 'indigo',
    className = ""
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8', 
        lg: 'w-12 h-12'
    };

    const colorClasses = {
        indigo: 'border-indigo-200 border-t-indigo-600',
        pink: 'border-pink-200 border-t-pink-600',
        gray: 'border-gray-200 border-t-gray-600'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl'
    };

    return (
        <div className={`text-center ${className}`}>
            <div className="inline-flex items-center gap-3">
                <div 
                    className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`}
                ></div>
                <span className={`${textSizes[size]} text-gray-600`}>
                    {message}
                </span>
            </div>
        </div>
    );
}

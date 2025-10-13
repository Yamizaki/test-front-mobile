interface SkeletonLoaderProps {
    variant?: 'grid' | 'detail' | 'card';
    count?: number;
    className?: string;
}

// Componente individual para el card skeleton
function SkeletonCard({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-gray-50 rounded-xl p-6 animate-pulse ${className}`}>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
        </div>
    );
}

export default function SkeletonLoader({ 
    variant = 'grid', 
    count = 6,
    className = ""
}: SkeletonLoaderProps) {

    if (variant === 'card') {
        return <SkeletonCard className={className} />;
    }

    if (variant === 'detail') {
        return (
            <div className={`space-y-6 ${className}`}>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    // variant === 'grid' (default)
    return (
        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {Array.from({ length: count }, (_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
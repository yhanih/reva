import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-500 border-r-transparent"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return children;
}

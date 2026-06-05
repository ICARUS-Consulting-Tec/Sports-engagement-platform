import { WrapperProps } from '../../types/shared'
import { Auth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const UserRoute = ({children}: WrapperProps) => {
    const { session, role, loading } = Auth();

    if (session === undefined || loading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center bg-[#F4F5F7] p-6">
                <p className="text-sm font-medium text-[#516173]">Loading application...</p>
            </div>
        );
    }

    if (role === 'admin') return <Navigate to="/admin" />;

    return <>{children}</>;
}

export default UserRoute;
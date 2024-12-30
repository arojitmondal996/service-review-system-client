import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../Authprovider/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    if (loading) {
        return <div className='flex justify-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate to={`/login`}></Navigate>
};

export default PrivateRoute;
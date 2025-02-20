import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import { TodoComponent } from './TodoComponent';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth} from './security/AuthContext';

import './TodoApp.css';

function AuthenticatedRoute({ children }) {
    const authContext = useAuth();
    if(authContext.isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default function TodoApp(){
    return (
        <div className="TodoApp">
            <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>} />
                    <Route path='/login' element={<LoginComponent/>} />
                    <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>
                            <WelcomeComponent/>
                        </AuthenticatedRoute>
                    } />
                    <Route path='/todos' element={
                        <AuthenticatedRoute>
                            <ListTodosComponent/>
                        </AuthenticatedRoute>
                    } />
                    <Route path='/todo/:id' element={
                        <AuthenticatedRoute>
                            <TodoComponent/>
                        </AuthenticatedRoute>
                    } />
                    <Route path='/logout' element={
                        <AuthenticatedRoute>
                            <LogoutComponent/>
                        </AuthenticatedRoute>
                    } />
                    <Route path='*' element={<ErrorComponent/>} />              
                </Routes>
            <FooterComponent />
        </div>
    )
}
















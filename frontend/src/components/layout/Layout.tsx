import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div className="flex min-h-screen bg-primary-950">
            <Sidebar />
            <main className="flex-1 ml-56 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
}

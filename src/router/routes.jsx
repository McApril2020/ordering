import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../components/Dashboard.jsx';
import MyOrders from '../components/MyOrders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/myorders/:username',
        element: <MyOrders />,
    },

])

export default router;
import Login from '../pages/Login';
import Home from '../pages/Home';
import Booking from '../pages/Booking';
import DefaultLayout from '../components/Layout/DefaultLayout';
import HeaderOnlyLayout from '../components/Layout/HeaderOnlyLayout';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/login', component: Login, layout: HeaderOnlyLayout },
    { path: '/booking', component: Booking, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

import Login from '../pages/Login';
import Home from '../pages/Home';
import Booking from '../pages/Booking';
import Register from '../pages/Register';
import Movies from '../pages/Movies';
import AboutUs from '../pages/AboutUs';
import UserProfile from '../pages/UserProfile';
import AdminDashboard from '../pages/AdminDashboard';
import DefaultLayout from '../components/Layout/DefaultLayout';
import HeaderOnlyLayout from '../components/Layout/HeaderOnlyLayout';
import AdminLayout from '../components/Layout/AdminLayout';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/login', component: Login, layout: HeaderOnlyLayout },
    { path: '/booking', component: Booking, layout: DefaultLayout },
    { path: '/register', component: Register, layout: HeaderOnlyLayout },
    { path: '/movies', component: Movies, layout: DefaultLayout },
    { path: '/aboutus', component: AboutUs, layout: DefaultLayout },
];

const userRoutes = [{ path: '/userprofile', component: UserProfile, layout: DefaultLayout }];

const adminRoutes = [{ path: '/admindashboard', component: AdminDashboard, layout: AdminLayout }];

export { publicRoutes, userRoutes, adminRoutes };

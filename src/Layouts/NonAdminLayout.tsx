import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/Navbar/TopNav';
import WhatsAppButton from '../components/WhatsAppButton';

function NonAdminLayout() {
    return (
        <div>
            <TopNav />
            <Navbar />
            <Outlet />
            <WhatsAppButton />
            <Footer />
        </div>
    );
}

export default NonAdminLayout;

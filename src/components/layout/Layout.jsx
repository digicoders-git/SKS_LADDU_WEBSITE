import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import ScrollToTop from "../../utils/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[var(--color-accent)] font-[var(--font-main)] pt-24 md:pt-28">
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Layout;

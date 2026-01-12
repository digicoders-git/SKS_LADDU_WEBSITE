import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../../utils/ScrollToTop";

const Layout = () => {
    return (
        <div className="min-h-screen bg-[var(--color-accent)] font-[var(--font-main)]">
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            {/* Footer is already in Home.jsx for now, but usually it goes here */}
        </div>
    );
};

export default Layout;

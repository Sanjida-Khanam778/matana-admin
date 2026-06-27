import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
    const location = useLocation();
    return (
        <div className="font-rubik">
            {
                location.pathname === "/category-details" || location.pathname.includes("/community-details") || location.pathname === "/"
                ? null
                : <Navbar />
            }
            
            <Outlet />
            <Footer />
        </div>
    );
}

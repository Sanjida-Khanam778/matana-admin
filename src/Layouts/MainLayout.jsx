import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import VisitorPopupModal from "../components/VisitorPopupModal/VisitorPopupModal";

export default function MainLayout() {
    const location = useLocation();
    return (
        <div className="font-rubik">
            <ScrollRestoration />
            {
                location.pathname.includes("/community-details") || location.pathname === "/"
                ? null
                : <Navbar />
            }
            
            <Outlet />
            <Footer />
            <VisitorPopupModal />
        </div>
    );
}

import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-[#aa5042] bg-[#753742] text-[#efefd1]/80 text-sm">
            <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-xs opacity-70">
                    &copy; {new Date().getFullYear()} Prefire. An independent project, not affiliated with CAL FIRE or any government agency.
                </p>
                <nav className="flex gap-5 text-sm">
                    <Link to="/legal/terms" className="hover:underline">
                        Terms
                    </Link>
                    <Link to="/legal/privacy" className="hover:underline">
                        Privacy
                    </Link>
                    <a href="mailto:hello@prefire.online" className="hover:underline">
                        Contact
                    </a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;

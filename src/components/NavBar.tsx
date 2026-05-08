import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    { to: "/map", label: "Analyzer" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/donate", label: "Donate" },
];

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="relative">
            {/* Desktop: horizontal links */}
            <ul className="hidden md:flex space-x-6 text-lg text-[#efefd1]">
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <Link to={to} className="hover:underline">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile: hamburger button */}
            <button
                className="md:hidden text-[#efefd1] text-2xl leading-none p-1 select-none"
                onClick={() => setIsOpen((o) => !o)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Mobile: dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[#753742] border border-[#aa5042] rounded-lg shadow-xl z-50 py-2 min-w-[10rem] md:hidden">
                    {links.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className="block px-4 py-2 text-[#efefd1] hover:bg-[#aa5042] text-base"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default NavBar;

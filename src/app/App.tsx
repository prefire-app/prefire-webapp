import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import HomeHero from "../components/HomeHero";
import Learning from "../components/Learning";
import Donate from "../components/Donate";

// Lazy-load the map so Leaflet (browser-only) is never evaluated during SSR
const MappingTool = lazy(() => import("../components/MappingTool"));

function App() {
    return (
        <div className="min-h-screen bg-[#753742]">
            <header className="flex items-center justify-between p-4">
                <div className="flex w-full items-center">
                    <div className="flex-1 flex justify-start">
                        <Logo />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <NavBar />
                    </div>
                    <div className="flex-1 flex justify-end">
                        {/* Right column, leave empty or add future content */}
                    </div>
                </div>
            </header>
            <main>
                <Suspense fallback={<div className="p-8 text-[#efefd1]">Loading…</div>}>
                    <Routes>
                        <Route path="/" element={<HomeHero />} />
                        <Route path="/map" element={<MappingTool />} />
                        <Route path="/learning" element={<Learning />} />
                        <Route path="/donate" element={<Donate />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App;

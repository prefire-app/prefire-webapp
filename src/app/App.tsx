import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import HomeHero from "../components/HomeHero";
import Learning from "../components/Learning";
import Donate from "../components/Donate";
import Blog from "../components/Blog";
import BlogPost from "../components/BlogPost";
import About from "../components/about/About";
import AboutTool from "../components/about/AboutTool";
import AboutMe from "../components/about/AboutMe";
import AboutMission from "../components/about/AboutMission";
import AboutData from "../components/about/AboutData";
import AboutMethodology from "../components/about/AboutMethodology";
import AboutContact from "../components/about/AboutContact";

// Lazy-load the map so Leaflet (browser-only) is never evaluated during SSR
const MappingTool = lazy(() => import("../components/MappingTool"));

function App() {
    return (
        <div className="min-h-screen bg-[#753742]">
            <header className="sticky top-0 z-50 h-16 flex items-center p-4 md:px-6 bg-[#753742]">
                {/* Left: Logo — takes flex-1 so it pushes NavBar to center on desktop */}
                <div className="flex-1">
                    <Logo />
                </div>
                <NavBar />
                {/* Right spacer on desktop — balances Logo so NavBar stays centered */}
                <div className="hidden md:flex flex-1" />
            </header>
            <main>
                <Suspense fallback={<div className="p-8 text-[#efefd1]">Loading…</div>}>
                    <Routes>
                        <Route path="/" element={<HomeHero />} />
                        <Route path="/map" element={
                            <div style={{ height: 'calc(100dvh - 4rem)' }}>
                                <MappingTool />
                            </div>
                        } />
                        <Route path="/learning" element={<Learning />} />
                        <Route path="/donate" element={<Donate />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/about/tool" element={<AboutTool />} />
                        <Route path="/about/me" element={<AboutMe />} />
                        <Route path="/about/mission" element={<AboutMission />} />
                        <Route path="/about/data" element={<AboutData />} />
                        <Route path="/about/methodology" element={<AboutMethodology />} />
                        <Route path="/about/contact" element={<AboutContact />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App;

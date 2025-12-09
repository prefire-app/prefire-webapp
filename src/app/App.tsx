import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import HomeHero from "../components/HomeHero";
import Learning from "../components/Learning";
import MappingTool from "../components/MappingTool";

function App() {
  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<HomeHero />} />
            <Route path="/map" element={<MappingTool />} />
            <Route path="/learning" element={<Learning />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

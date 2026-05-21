import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Index";
import GalleryPage from "./pages/gallery/Index";
import SplashCursor from "./components/cursor/Index";

function App() {
  return (
    <main className="bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route
            path="*"
            element={
              <div className="text-heading-2 text-center flex items-center justify-center text-white">
                No Page Found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      <SplashCursor />
    </main>
  );
}

export default App;

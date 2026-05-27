import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashCursor from "./components/cursor/Index";

const HomePage = lazy(() => import("./pages/home/Index"));
const GalleryPage = lazy(() => import("./pages/gallery/Index"));

const PageLoader = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center text-body-4">
    Loading
  </div>
);

function App() {
  return (
    <main className="bg-black">
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen text-heading-2 text-center flex items-center justify-center text-white">
                  No Page Found
                </div>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <SplashCursor />
    </main>
  );
}

export default App;

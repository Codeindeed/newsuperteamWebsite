import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashCursor from "./components/cursor/Index";

const HomePage = lazy(() => import("./pages/home/Index"));
const GalleryPage = lazy(() => import("./pages/gallery/Index"));
const PartnersPage = lazy(() => import("./pages/partners/Index"));
const NotFoundPage = lazy(() => import("./pages/not-found/Index"));

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
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <SplashCursor />
    </main>
  );
}

export default App;

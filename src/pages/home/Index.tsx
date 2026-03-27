//import Navigation from "@/layouts/navigation/Index";
import VerticalScrollContainer from "@/layouts/vertical-scroll-container/Index";
import Header from "./layouts/header/Index";
import About from "./layouts/about/Index";
import Gallery from "./layouts/gallery/Index";
import Gdp from "./layouts/gdp/Index";
import Events from "./layouts/events/Index";
import Products from "./layouts/products/Index";
import Blog from "./layouts/blog/Index";
import Footer from "./layouts/footer/Index";

const HomePage = () => {
  return (
    <div>
      {/* <Navigation /> */}
      <VerticalScrollContainer
        showProgress={true}
        showScrollIndicator={true}
        progressBarColor="from-purple-500 to-cyan-500"
      >
        <Header />
        <Gdp />
        <About />
        <Gallery />
        <Events />
        <Products />
        <Blog />
        <Footer />
      </VerticalScrollContainer>
    </div>
  );
};

export default HomePage;

import VerticalScrollContainer from "@/layouts/vertical-scroll-container/Index";
import Footer from "@/pages/home/layouts/footer/Index";
import PartnersHero from "./components/PartnersHero";
import PartnerGrid from "./components/PartnerGrid";
import PerksSection from "./components/PerksSection";
import ReachOut from "./components/ReachOut";

const PartnersPage = () => {
  return (
    <VerticalScrollContainer showProgress={true} showScrollIndicator={true}>
      <PartnersHero />
      <PartnerGrid />
      <PerksSection />
      <ReachOut />
      <Footer />
    </VerticalScrollContainer>
  );
};

export default PartnersPage;

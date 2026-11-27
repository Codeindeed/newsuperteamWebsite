import Button from "@/components/button/Index";
import VerticalScrollContainer from "@/layouts/vertical-scroll-container/Index";

// The 404 page uses the shared shell so the navigation bar and the mobile
// menu are available here too.
const NotFoundPage = () => {
  return (
    <VerticalScrollContainer showProgress={true} showScrollIndicator={false}>
      <section className="min-h-screen bg-black px-4 md:px-[5vw] lg:px-[12vw] pb-28 text-white flex flex-col items-center justify-center text-center">
        <h1 className="text-heading-5 md:text-heading-2 !font-medium text-white">
          No Page Found
        </h1>
        <p className="text-[#525252] text-body-4 mt-4 max-w-[360px]">
          That link leads nowhere. Head back home and try again.
        </p>
        <div className="mt-8">
          <Button type="primary" to="/">
            Back home
          </Button>
        </div>
      </section>
    </VerticalScrollContainer>
  );
};

export default NotFoundPage;

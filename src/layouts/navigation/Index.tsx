import Button from "@/components/button/Index";
import Logo from "@/components/logo/Index";

const Navigation = () => {
  return (
    <div className="px-[8vw] py-5 flex items-center justify-between">
      <Logo className="h-8" to="/" />

      <Button type="secondary">Join the Community</Button>
    </div>
  );
};

export default Navigation;

import LogoImg from "@/assets/logo/logo.svg";
import { Link } from "react-router-dom";

interface LogoProps {
  type?: string;
  className: string;
  to: string;
}

const Logo = ({ className, to, ...props }: LogoProps) => {
  const styles = "h-[28px] " + className;

  return (
    <Link to={to}>
      <img src={LogoImg} {...props} className={styles} />
    </Link>
  );
};

export default Logo;

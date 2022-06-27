import { Logo } from "../../../styles/Logo.style";

interface Props {
  url: string;
  logo: string;
  name: string;
}
const LogoComponent: React.FC<Props> = ({ url, logo, name }) => {
  return (
    <Logo href={url}>
      <picture>
        <img src={logo} alt="logo" />
      </picture>
      {name}
    </Logo>
  );
};
export default LogoComponent;

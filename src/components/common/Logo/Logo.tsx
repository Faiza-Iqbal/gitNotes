import { Logo } from "../../../styles/styled_components";

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

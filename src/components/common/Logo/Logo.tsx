import { Logo } from "../../../styles/Logo.style";
interface Props {
  url: string;
  logo: string;
  name: string;
}
const LogoComponent: React.FC<Props> = ({ url, logo, name }) => {
  return (
    <Logo href={url} target="_blank">
      <picture>
        <img src={logo} alt=""/>
      </picture>
      {name}
    </Logo>
  );
};
export default LogoComponent;
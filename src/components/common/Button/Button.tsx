import { ButtonStyled } from "../../../styles/ButtonStyled.style";
interface Props {
  handleClick : () => void;
  label : string;

}
const Button:React.FC<Props> = ({ handleClick , label }) => {
  return <ButtonStyled onClick={handleClick}>{label}</ButtonStyled>;
};
export default Button;

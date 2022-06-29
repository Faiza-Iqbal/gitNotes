type SubmitButtonProps = {
  handleSubmit: () => Promise<void>;
  label: string;
};

const SubmitButton = ({ handleSubmit, label }: SubmitButtonProps) => {
  return (
    <button onClick={handleSubmit} className="submitButton">
      {label}
    </button>
  );
};
export default SubmitButton;

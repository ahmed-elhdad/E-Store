import Loading from "../Loading";

const PrimaryButton = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.loading}
      className="px-4 w-full capitalize cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
    >
      {props.loading ? <Loading /> : props.text}
    </button>
  );
};

export default PrimaryButton;

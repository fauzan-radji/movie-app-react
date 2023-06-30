import PropTypes from "prop-types";

export default function InputIcon({
  children: icon,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-md bg-secondary py-2 pl-2">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-l border-l-accent/20 bg-transparent px-2 text-text outline-none placeholder:text-text/50"
      />
    </div>
  );
}

InputIcon.propTypes = {
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

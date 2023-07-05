import PropTypes from "prop-types";
import { forwardRef } from "react";

const InputIcon = forwardRef(
  ({ children: icon, placeholder, type = "text", required = false }, ref) => (
    <div className="flex w-full items-center gap-2 rounded-md bg-secondary py-2 pl-2">
      {icon}
      <input
        type={type}
        ref={ref}
        required={required}
        placeholder={placeholder}
        className="w-full border-l border-l-accent/20 bg-transparent px-2 text-text outline-none placeholder:text-text/50"
      />
    </div>
  )
);

InputIcon.displayName = "InputIcon";
InputIcon.propTypes = {
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default InputIcon;

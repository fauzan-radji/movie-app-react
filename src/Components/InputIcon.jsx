import PropTypes from "prop-types";
import { forwardRef, useId } from "react";

const InputIcon = forwardRef(
  (
    {
      children: icon,
      placeholder,
      type = "text",
      required = false,
      max = "",
      min = "",
    },
    ref
  ) => {
    const id = useId();

    // FIXME: the floating label is not working properly for date inputs
    return (
      <div className="relative flex w-full items-center">
        <input
          id={id}
          type={type}
          ref={ref}
          required={required}
          min={min}
          max={max}
          placeholder={placeholder}
          className="peer h-full w-full rounded-md border-2 border-text/40 bg-transparent px-3 py-2 outline-none transition duration-300 placeholder:text-transparent focus:border-accent"
        />
        <label
          htmlFor={id}
          className="absolute left-2 z-20 m-auto flex h-2 -translate-y-5 items-center gap-1 bg-background px-1 text-text/70 transition duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:text-accent"
        >
          {icon}
          {placeholder}
        </label>
      </div>
    );
  }
);

InputIcon.displayName = "InputIcon";
InputIcon.propTypes = {
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.string,
};

export default InputIcon;

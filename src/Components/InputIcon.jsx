import PropTypes from "prop-types";
import { forwardRef, useId, useState } from "react";

const InputIcon = forwardRef(
  (
    {
      children: icon,
      placeholder,
      type = "text",
      required = false,
      max = "",
      min = "",
      validate = () => ({ isError: false, message: "" }),
      onErrorChange = () => {},
    },
    ref
  ) => {
    const [error, setError] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const id = useId();

    // FIXME: the floating label is not working properly for date inputs
    return (
      <div className="flex w-full flex-col gap-1">
        <div className="relative flex w-full flex-col items-center justify-center">
          <input
            id={id}
            type={type}
            ref={ref}
            required={required}
            min={min}
            max={max}
            placeholder={placeholder}
            className={`peer h-full w-full rounded-md border-2 ${
              isValid ? "border-complimentary" : "border-danger-600"
            } bg-transparent px-3 py-2 outline-none transition duration-300 placeholder:text-transparent ${
              isValid ? "focus:border-complimentary" : "focus:border-danger-600"
            }`}
            onChange={(e) => {
              onErrorChange({ id: e.target.id, error: "" });

              if (!e.target.value) {
                setError(false);
                setIsValid(true);
                return;
              }
              if (!validate) return;

              const { isError, message } = validate(e.target.value);
              if (isError) {
                onErrorChange({ id: e.target.id, error: message });
                setError(message);
                setIsValid(false);
                return;
              }

              setError(false);
              setIsValid(true);
            }}
          />
          <label
            htmlFor={id}
            className={`absolute left-2 z-20 m-auto flex h-2 -translate-y-5 items-center gap-1 bg-neutral px-1 ${
              isValid ? "text-neutralContrast" : "text-danger-600"
            } transition duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 ${
              isValid
                ? "peer-focus:text-complimentaryDark"
                : "peer-focus:text-danger-600"
            }`}
          >
            {icon}
            {placeholder}
          </label>
        </div>

        {error && <span className="text-sm text-danger-600">{error}</span>}
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
  validate: PropTypes.func,
  onErrorChange: PropTypes.func,
};

export default InputIcon;

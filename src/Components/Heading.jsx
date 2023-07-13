import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Icons from "./Icons";
import { twMerge } from "tailwind-merge";

export default function Heading({ children, className, rightButton }) {
  const navigate = useNavigate();
  return (
    <div
      className={twMerge(
        "relative mt-4 flex h-8 items-center justify-center",
        className
      )}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center rounded-md bg-complimentary px-2 py-1 text-complimentaryContrast"
      >
        <Icons.ChevronLeft className="h-4 w-4" />
      </button>
      <h2 className="text-center font-bold">{children}</h2>
      {rightButton}
    </div>
  );
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  rightButton: PropTypes.node,
};

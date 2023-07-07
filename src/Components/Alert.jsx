import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Icons from "./Icons";

export default function Alert({ children, bgColor, className, close }) {
  setTimeout(close, 3000);

  return (
    <div
      className={twMerge(
        `flex items-center gap-2 rounded-md ${bgColor} px-4 py-3 text-sm font-bold text-white`,
        className
      )}
      role="alert"
    >
      {children}

      <button
        className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
        onClick={close}
      >
        <Icons.XMark className="h-4 w-4" />
      </button>
    </div>
  );
}

Alert.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

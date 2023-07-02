import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Alert({ children, icon, bgColor, className }) {
  return (
    <div
      className={twMerge(
        `flex items-center gap-2 rounded-md ${bgColor} px-4 py-3 text-sm font-bold text-white`,
        className
      )}
      role="alert"
    >
      {icon}
      {children}
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

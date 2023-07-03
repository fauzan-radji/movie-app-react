import PropTypes from "prop-types";
import Alert from "./Alert";
import Icons from "./Icons";

export default function SuccessAlert({ children, className }) {
  return (
    <Alert
      icon={<Icons.Check className="h-6 w-6 flex-shrink-0" />}
      bgColor="bg-success-700"
      className={className}
    >
      {children}
    </Alert>
  );
}

SuccessAlert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

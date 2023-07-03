import PropTypes from "prop-types";
import Alert from "./Alert";
import Icons from "./Icons";

export default function ErrorAlert({ children, className }) {
  return (
    <Alert
      icon={<Icons.ExclamationTri className="h-6 w-6 flex-shrink-0" />}
      bgColor="bg-danger-600"
      className={className}
    >
      {children}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

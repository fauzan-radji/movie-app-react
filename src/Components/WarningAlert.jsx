import PropTypes from "prop-types";
import Alert from "./Alert";
import Icons from "./Icons";

export default function WarningAlert({ children, className, close }) {
  return (
    <Alert bgColor="bg-warning-600" className={className} close={close}>
      <Icons.ExclamationCircle className="h-6 w-6 flex-shrink-0" />
      {children}
    </Alert>
  );
}

WarningAlert.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

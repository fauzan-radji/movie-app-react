import { Alert, Icons } from "./";

import PropTypes from "prop-types";

export default function SuccessAlert({ children, className, close }) {
  return (
    <Alert bgColor="bg-success-700" className={className} close={close}>
      <Icons.Check className="h-6 w-6 flex-shrink-0" />
      {children}
    </Alert>
  );
}

SuccessAlert.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

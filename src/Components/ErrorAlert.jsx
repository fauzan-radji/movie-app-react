import { Alert, Icons } from "./";

import PropTypes from "prop-types";

export default function ErrorAlert({ children, className, close }) {
  return (
    <Alert bgColor="bg-danger-600" className={className} close={close}>
      <Icons.ExclamationTri className="h-6 w-6 flex-shrink-0" />
      {children}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import WarningAlert from "./WarningAlert";
import { twMerge } from "tailwind-merge";

import { ACTIONS, ALERT } from "../Constants";

export default function AlertContainer({ alerts, dispatch, className }) {
  return (
    <div className={twMerge(`mx-auto my-4 flex  flex-col gap-2`, className)}>
      {alerts.map((alert, index) => {
        if (alert.type === ALERT.ERROR) {
          return (
            <ErrorAlert
              key={index}
              className="w-full"
              close={() =>
                dispatch({ type: ACTIONS.ALERT_REMOVE, payload: alert.id })
              }
            >
              <p>{alert.message}</p>
            </ErrorAlert>
          );
        }

        if (alert.type === ALERT.SUCCESS) {
          return (
            <SuccessAlert
              key={index}
              className="w-full"
              close={() =>
                dispatch({ type: ACTIONS.ALERT_REMOVE, payload: alert.id })
              }
            >
              <p>{alert.message}</p>
            </SuccessAlert>
          );
        }

        if (alert.type === ALERT.WARNING) {
          return (
            <WarningAlert
              key={index}
              className="w-full"
              close={() =>
                dispatch({ type: ACTIONS.ALERT_REMOVE, payload: alert.id })
              }
            >
              <p>{alert.message}</p>
            </WarningAlert>
          );
        }
      })}
    </div>
  );
}

AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

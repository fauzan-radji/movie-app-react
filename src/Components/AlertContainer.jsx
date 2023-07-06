/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import WarningAlert from "./WarningAlert";
import { twMerge } from "tailwind-merge";

export const ACTIONS = {
  ERROR_PUSH: "error-push",
  SUCCESS_PUSH: "success-push",
  WARNING_PUSH: "warning-push",
  ALERT_REMOVE: "alert-remove",
};

const ALERT = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
};

export function alertReducer(alerts, action) {
  switch (action.type) {
    case ACTIONS.ERROR_PUSH:
      return [
        {
          id: Date.now() + Math.random(),
          type: ALERT.ERROR,
          message: action.payload,
        },
        ...alerts,
      ];
    case ACTIONS.SUCCESS_PUSH:
      return [
        {
          id: Date.now() + Math.random(),
          type: ALERT.SUCCESS,
          message: action.payload,
        },
        ...alerts,
      ];
    case ACTIONS.WARNING_PUSH:
      return [
        {
          id: Date.now() + Math.random(),
          type: ALERT.WARNING,
          message: action.payload,
        },
        ...alerts,
      ];
    case ACTIONS.ALERT_REMOVE:
      return alerts.filter((alert) => alert.id !== action.payload);
    default:
      return alerts;
  }
}

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

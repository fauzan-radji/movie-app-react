import { ACTIONS, ALERT } from "../Constants";

export default function alert(alerts, action) {
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

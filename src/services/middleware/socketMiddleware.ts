import { getCookie } from "../utils";
import { wsActions as wsActionTypes } from '../actions/feed';
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../utils";

export const socketMiddleware = (wsUrl: string, wsActions: typeof wsActionTypes): Middleware<{}> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type, withToken, payload } = action;
      const { wsInit, onOpen, onClose, onError, onGetOrders } = wsActions;
      const accessCookie = getCookie('token')?.split(' ')[1];
      const token = withToken ? accessCookie : '';

      if (type === wsInit) {
        socket = new WebSocket(withToken ? `${wsUrl}?token=${token}` : `${wsUrl}${payload}`);
      }

      if (socket) {
        socket.send = event => {
          dispatch({ type: onOpen, orders: event });
        };
        socket.onerror = event => {
          dispatch({ type: onError, orders: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsed = JSON.parse(data);
          dispatch({ type: onGetOrders, orders: parsed });
        };
        socket.onclose = event => {
          dispatch({ type: onClose, orders: event });
        };
      }
      next(action);
    };
  }
}; 
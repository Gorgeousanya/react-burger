import { TOrders } from '../../utils/types';
import {
  TFeedActions,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
  OPEN_WS_MODAL,
  CLOSE_WS_MODAL
} from '../actions/feed';

type TFeedState = {
  wsConnected: boolean;
  orders: TOrders;
  wsModal: boolean;
};

const feedInitialState: TFeedState = {
  wsConnected: false,
  orders: {} as TOrders,
  wsModal: true,
};

export const feedReducer = (state = feedInitialState, action: TFeedActions): TFeedState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      }
    case OPEN_WS_MODAL:
      return {
        ...state,
        wsModal: true
      }
    case CLOSE_WS_MODAL:
      return {
        ...state,
        wsModal: false
      }
    default:
      return state;
  }
};
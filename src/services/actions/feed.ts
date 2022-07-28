import { TOrders } from '../../utils/types';

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const OPEN_WS_MODAL: "OPEN_WS_MODAL" = "OPEN_WS_MODAL";
export const CLOSE_WS_MODAL: "CLOSE_WS_MODAL" = "CLOSE_WS_MODAL";

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly withToken: boolean
    readonly payload: string
}

export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetAction {
    readonly type: typeof WS_GET_ORDERS;
    readonly orders: TOrders;
}

export interface IOpenWsModal {
    readonly type: typeof OPEN_WS_MODAL;
}

export interface ICloseWsModal {
    readonly type: typeof CLOSE_WS_MODAL;
}

export const wsConnectionStartAction = (withToken: boolean, payload: string): IWsConnectionStartAction => ({
    type: WS_CONNECTION_START,
    withToken,
    payload
});

export const wsConnectionSuccessAction = (): IWsConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsConnectionErrorAction = (): IWsConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR
});

export const wsConnectionClosedAction = (): IWsConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
});

export const wsGetAction = (orders: TOrders): IWsGetAction => ({
    type: WS_GET_ORDERS,
    orders
});

export const wsOpenModal = (): IOpenWsModal => {
    return {
    type: OPEN_WS_MODAL,
}};

export const wsCloseModal = (): ICloseWsModal => {
    return {
    type: CLOSE_WS_MODAL,
}};

export type TWsActions = {
    wsInit: typeof WS_CONNECTION_START;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onClose: typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR;
    onGetOrders: typeof WS_GET_ORDERS;
    wsOpenModal: typeof OPEN_WS_MODAL;
    wsCloseModal: typeof CLOSE_WS_MODAL;
};

export const wsActions: TWsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onGetOrders: WS_GET_ORDERS,
    wsOpenModal: OPEN_WS_MODAL,
    wsCloseModal: CLOSE_WS_MODAL,
  };

  export type TFeedActions = 
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetAction
    | ICloseWsModal
    | IOpenWsModal
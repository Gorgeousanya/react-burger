import { feedReducer, feedInitialState } from './feed';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_ORDERS,
    OPEN_WS_MODAL,
    CLOSE_WS_MODAL,
    TFeedActions
} from '../actions/feed';

describe('Проверка feed reducer', () => {
    const order = {
        createdAt: "2022-07-27T08:16:15.906Z",
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"],
        name: "Space флюоресцентный бургер",
        number: 21424,
        status: "done",
        updatedAt: "2022-07-27T08:16:16.110Z",
        _id: "62e0f44f42d34a001c27cd46",
    };

    it('Проверка initialState', () => {
        expect(feedReducer(undefined, {} as TFeedActions)).toEqual(feedInitialState);
    });

    it('Проверка WS_CONNECTION_SUCCESS', () => {
        expect(feedReducer(feedInitialState, {
            type: WS_CONNECTION_SUCCESS,
        })).toEqual({
            ...feedInitialState,
            wsConnected: true,
        });
    });

    it('Проверка WS_CONNECTION_CLOSED', () => {
        expect(feedReducer(feedInitialState, {
            type: WS_CONNECTION_CLOSED,
        })).toEqual({
            ...feedInitialState,
            wsConnected: false,
        });
    });

    it('Проверка WS_CONNECTION_ERROR', () => {
        expect(feedReducer(feedInitialState, {
            type: WS_CONNECTION_ERROR,
        })).toEqual({
            ...feedInitialState,
            wsConnected: false,
        });
    });

    it('Проверка WS_GET_ORDERS', () => {
        const orders = {
            orders: [order],
            total: 21415,
            totalToday: 107,
        }

        expect(feedReducer(feedInitialState, {
            type: WS_GET_ORDERS,
            orders
        })).toEqual({
            ...feedInitialState,
            orders
        });
    });

    it('Проверка OPEN_WS_MODAL', () => {
        expect(feedReducer(feedInitialState, {
            type: OPEN_WS_MODAL,
        })).toEqual({
            ...feedInitialState,
            wsModal: true,
        });
    });

    it('Проверка CLOSE_WS_MODAL', () => {
        expect(feedReducer(feedInitialState, {
            type: CLOSE_WS_MODAL,
        })).toEqual({
            ...feedInitialState,
            wsModal: false,
        });
    });
});
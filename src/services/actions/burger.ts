import {
    checkResponse,
    AppDispatch,
    AppThunk,
    getCookie,
} from '../utils';
import {
    baseUrl
} from '../../utils/api';
import {
    TIngredient,
    IOrderState
} from '../../utils/types'

export const SET_TAB: 'SET_TAB' = 'SET_TAB';
export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';
export const GET_CONSTRUCTOR: 'GET_CONSTRUCTOR' = 'GET_CONSTRUCTOR';
export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';
export const CLOSE_MODAL_ORDER: 'CLOSE_MODAL_ORDER' = 'CLOSE_MODAL_ORDER';
export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const CHANGE_SORT: 'CHANGE_SORT' = 'CHANGE_SORT';

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly data: IOrderState;
}

export interface IGetOrderErrorAction {
    readonly type: typeof GET_ORDER_ERROR;
}

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: Array<TIngredient>;
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly item: TIngredient;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
}

export interface ISetTab {
    readonly type: typeof SET_TAB;
    readonly tab: string
}

export interface IChangeSortAction {
    readonly type: typeof CHANGE_SORT;
    readonly drag: number;
    readonly hover: number;
}

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL;
    readonly item: TIngredient;
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
}

export interface IOpenModalOrderAction {
    readonly type: typeof OPEN_MODAL_ORDER;
}

export interface ICloseModalOrderAction {
    readonly type: typeof CLOSE_MODAL_ORDER;
}

export interface IResetOrderlAction {
    readonly type: typeof RESET_ORDER;
}

const getOrderRequestAction = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
})
const getOrderSuccessAction = (data: any): IGetOrderSuccessAction => ({
                        type: GET_ORDER_SUCCESS,
                        data
                    })

const getOrderErrorAction = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
})

const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
})
const getIngredientsSuccessAction = (data: any): IGetIngredientsSuccessAction => ({
                        type: GET_INGREDIENTS_SUCCESS,
                        data
                    })
const getIngredientsErrorAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
})

export const getOrderID: AppThunk = (data: TIngredient) => {

    return (dispatch: AppDispatch) => {
        try {
            dispatch(getOrderRequestAction());

            fetch(baseUrl + "orders", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "ingredients": data
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${getCookie('token')}`
                }
            })
                .then(checkResponse)
                .then(obj => {
                    dispatch(getOrderSuccessAction(obj));
                });
        } catch (error) {
            console.log(error)
            dispatch(getOrderErrorAction());
        }
    }
};

export const getIngredientsData: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        try {
            dispatch(getIngredientsRequestAction());

            fetch(baseUrl + "ingredients")
                .then(checkResponse)
                .then(obj => {
                    dispatch(getIngredientsSuccessAction(obj.data));
                });
        } catch (error) {
            console.log(error)
            dispatch(getIngredientsErrorAction());
        }
    }
};

export const addIngredient = (item: TIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        item
    }
}

export const deleteIngredient = (id: string): IDeleteIngredientAction => {
    return {
        type: DELETE_INGREDIENT,
        id
    }
}

export const changeSortIngredient = (drag: number, hover: number): IChangeSortAction => {
    return {
        type: CHANGE_SORT,
        drag,
        hover
    }
}

export const openModal = (el: TIngredient): IOpenModalAction => {
    return {
        type: OPEN_MODAL,
        item: el
    }
}

export const closeModal = (): ICloseModalAction => {
    return {
        type: CLOSE_MODAL,
    }
}

export const setTab = (e: string): ISetTab => {
    return {
        type: SET_TAB,
        tab: e
    }
}

export const openModalOrder = (): IOpenModalOrderAction => {
    return {
        type: OPEN_MODAL_ORDER
    }
}

export const closeModalOrder = (): ICloseModalOrderAction => {
    return {
        type: CLOSE_MODAL_ORDER,
    }
}

export const resetOrder = (): IResetOrderlAction => {
    return {
        type: RESET_ORDER,
    }
}

export type TBurgerActions = | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderErrorAction
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction
    | IAddIngredientAction
    | IDeleteIngredientAction
    | ISetTab
    | IChangeSortAction
    | IOpenModalAction
    | ICloseModalAction
    | IOpenModalOrderAction
    | ICloseModalOrderAction
    | IResetOrderlAction;
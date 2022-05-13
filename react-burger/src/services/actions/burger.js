import {
    checkResponse
} from '../utils';
import {
    baseUrl
} from '../../utils/api';
export const SET_TAB = 'SET_TAB';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_CONSTRUCTOR = 'GET_CONSTRUCTOR';
export const OPEN_MODAL = 'OPEN_MODAL';
export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const SET_ORDER = 'SET_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CHANGE_SORT = 'CHANGE_SORT';

export const getOrderID = (data) => {

    return (dispatch) => {
        try {
            dispatch({
                type: GET_ORDER_REQUEST
            });

            fetch(baseUrl + "orders", {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        "ingredients": data
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(checkResponse)
                .then(obj => {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        data: obj
                    });
                });
        } catch (error) {
            dispatch({
                type: GET_ORDER_ERROR,
                error: error
            });
        }
    }
};

export const getIngredientsData = () => {
    return (dispatch) => {
        try {
            dispatch({
                type: GET_INGREDIENTS_REQUEST
            });

            fetch(baseUrl + "ingredients")
                .then(checkResponse)
                .then(obj => {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        data: obj.data
                    });
                });
        } catch (error) {
            dispatch({
                type: GET_INGREDIENTS_ERROR,
                error: error
            });
        }
    }
};

export const addIngredient = (item) => {
    return {
        type: ADD_INGREDIENT,
        item
    }
}

export const deleteIngredient = (id) => {
    return {
        type: DELETE_INGREDIENT,
        id
    }
}

export const changeSortIngredient = (drag, hover) => {
    return {
        type: CHANGE_SORT,
        drag,
        hover
    }
}

export const openModal = (el) => {
    return {
        type: OPEN_MODAL, 
        item: el 
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL, 
    }
}

export const setTab = (e) => {
    return {
        type: SET_TAB, 
        tab: e
    }
}

export const openModalOrder = () => {
    return {
        type: OPEN_MODAL_ORDER
    }
}

export const closeModalOrder = () => {
    return {
        type: CLOSE_MODAL_ORDER, 
    }
}

export const resetOrder = () => {
    return {
        type: CLEAR_ORDER, 
    }
}
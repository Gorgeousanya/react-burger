import {
    setCookie,
    deleteCookie,
    getCookie
} from '../utils';
import {
    baseUrl
} from '../../utils/api';

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_REQUEST = "REGISTER_REQUEST";
export const LOGIN_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_FAILED = "REGISTER_FAILED";
export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
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

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

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
                    console.log(obj)
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
export function register(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        fetch(baseUrl + "auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                }),
            })
            .then(res => {
                let authToken;
                res.headers.forEach(header => {
                    if (header.indexOf('Bearer') === 0) {
                        authToken = header.split('Bearer ')[1];
                    }
                });
                if (authToken) {
                    setCookie('token', authToken);
                }
                return res.json();
            })
            .then((res) => {
                if (res.success) {
                    console.log(res.user);
                    setCookie('token', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: REGISTER_FAILED
                })
            });
    }
}

export function login(email, password) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        fetch(baseUrl + "auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }),
            })
            .then(res => {
                let authToken;
                res.headers.forEach(header => {
                    if (header.indexOf('Bearer') === 0) {
                        authToken = header.split('Bearer ')[1];
                    }
                });
                if (authToken) {
                    setCookie('token', authToken);
                }
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    setCookie('token', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: data.user
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGIN_FAILED
                })
            });
    }
}

export function updateToken() {
    return function (dispatch) {
        dispatch({
            type: UPDATE_TOKEN_REQUEST
        });
        fetch(baseUrl + "auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                }),
            })
            .then(res => {
                return res.json();
            })
            .then((res) => {
                if (res.success) {
                    setCookie('token', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatch({
                        type: UPDATE_TOKEN_SUCCESS
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: UPDATE_TOKEN_FAILED
                })
            });
    }
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        fetch(baseUrl + "auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                }),
            })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    localStorage.removeItem('refreshToken');
                    deleteCookie('token');
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGOUT_FAILED
                })
            });
    }
}

export function getUser() {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        fetch(baseUrl + "auth/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getCookie('token'),
                },
            })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_SUCCESS,
                        user: data.user
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                if (localStorage.getItem('refreshToken')) {
                    dispatch(updateToken());
                    dispatch(getUser());
                } else {
                    dispatch({
                        type: USER_FAILED
                    })
                }
            });
    }
}

export function updateUser(email, name) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        fetch(baseUrl + "auth/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getCookie('token'),
                },
                body: JSON.stringify({
                    email,
                    name
                }),
            })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
                if (data.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: data.user
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                if (localStorage.getItem('refreshToken')) {
                    dispatch(updateToken());
                    dispatch(updateUser(email, name));
                } else {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                }
            });
    }
}

export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        fetch(baseUrl + "password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                }),
            })
            .then(res => {
                return res.json();
            })
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            });
    }
}

export function resetPassword(password, token) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        fetch(baseUrl + "password-reset/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password,
                    token
                }),
            })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            });
    }
}
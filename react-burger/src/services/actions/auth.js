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
import {
    setCookie,
    deleteCookie,
    getCookie,
    checkResponse,
    AppDispatch, 
    AppThunk
} from '../utils';
import {
    baseUrl
} from '../../utils/api';

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_ERROR: "REGISTER_ERROR" = "REGISTER_ERROR";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_ERROR: "LOGIN_ERROR" = "LOGIN_ERROR";
export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_ERROR: "UPDATE_TOKEN_ERROR" = "UPDATE_TOKEN_ERROR";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";
export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_ERROR: "USER_ERROR" = "USER_ERROR";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR: "UPDATE_USER_ERROR" = "UPDATE_USER_ERROR";
export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR" = "FORGOT_PASSWORD_ERROR";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR" = "RESET_PASSWORD_ERROR";

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    };
}

export interface IRegisterErrorAction {
    readonly type: typeof REGISTER_ERROR;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    };
}

export interface ILoginErrorAction {
    readonly type: typeof LOGIN_ERROR;
}

export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenErrorAction {
    readonly type: typeof UPDATE_TOKEN_ERROR;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutErrorAction {
    readonly type: typeof LOGOUT_ERROR;
}

export interface IUserRequestAction {
    readonly type: typeof USER_REQUEST;
}

export interface IUserSuccessAction {
    readonly type: typeof USER_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    };
}

export interface IUserErrorAction {
    readonly type: typeof USER_ERROR;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    };
}

export interface IUpdateUserErrorAction {
    readonly type: typeof UPDATE_USER_ERROR;
}

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordErrorAction {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

const registerRequestAction = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });
const registerSuccessAction = (user: {
    name: string;
    email: string;
}): IRegisterSuccessAction => ({ type: REGISTER_SUCCESS, user });
const registerErrorAction = (): IRegisterErrorAction => ({ type: REGISTER_ERROR });
const loginRequestAction = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
const loginSuccessAction = (user: {
    name: string;
    email: string;
}): ILoginSuccessAction => ({ type: LOGIN_SUCCESS, user });
const loginErrorAction = (): ILoginErrorAction => ({ type: LOGIN_ERROR });
const updateTokenRequestAction = (): IUpdateTokenRequestAction => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccessAction = (): IUpdateTokenSuccessAction => ({ type: UPDATE_TOKEN_SUCCESS });
const updateTokenErrorAction = (): IUpdateTokenErrorAction => ({ type: UPDATE_TOKEN_ERROR });
const logoutRequestAction = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
const logoutSuccessAction = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS });
const logoutErrorAction = (): ILogoutErrorAction => ({ type: LOGOUT_ERROR });
const userRequestAction = (): IUserRequestAction => ({ type: USER_REQUEST });
const userSuccessAction = (user: {
    name: string;
    email: string;
}): IUserSuccessAction => ({ type: USER_SUCCESS, user });
const userErrorAction = (): IUserErrorAction => ({ type: USER_ERROR });
const updateUserRequestAction = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccessAction = (user: {
    name: string;
    email: string;
}): IUpdateUserSuccessAction => ({ type: UPDATE_USER_SUCCESS, user });
const updateUserErrorAction = (): IUpdateUserErrorAction => ({ type: UPDATE_USER_ERROR });
const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({ type: FORGOT_PASSWORD_REQUEST });
const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({ type: FORGOT_PASSWORD_SUCCESS });
const forgotPasswordErrorAction = (): IForgotPasswordErrorAction => ({ type: FORGOT_PASSWORD_ERROR });
const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });
const resetPasswordErrorAction = (): IResetPasswordErrorAction => ({ type: RESET_PASSWORD_ERROR });

export const register: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(registerRequestAction());
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
            .then(checkResponse)
            .then((res) => {
                if (res.success) {
                    setCookie('token', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatch(registerSuccessAction(res.user));
                }
                else dispatch(registerErrorAction())
            })
            .catch((err) => {
                console.log(err);
                dispatch(registerErrorAction())
            });
    }
}

export const login: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(loginRequestAction());
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
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    setCookie('token', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    dispatch(loginSuccessAction(data.user));
                } else {
                dispatch(loginErrorAction())}
            })
            .catch((err) => {
                console.log(err);
                dispatch(loginErrorAction())
            });
    }
}

export const updateToken: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch(updateTokenRequestAction());
        fetch(baseUrl + "auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                }),
            })
            .then(checkResponse)
            .then((res) => {
                if (res.success) {
                    setCookie('token', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatch(updateTokenSuccessAction());
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(updateTokenErrorAction())
            });
    }
}

export const logout: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch(logoutRequestAction());
        fetch(baseUrl + "auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                }),
            })
            .then(checkResponse)
            .then((data) => {
                if (data.success) {
                    localStorage.removeItem('refreshToken');
                    deleteCookie('token');
                    dispatch(logoutSuccessAction());
                }
                else {
                    dispatch(logoutErrorAction())
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(logoutErrorAction())
            });
    }
}

export const getUser: AppThunk = () => {
    return function (dispatch) {
        dispatch(userRequestAction());
        fetch(baseUrl + "auth/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${getCookie('token')}`,
                },
            })
            .then(checkResponse)
            .then((data) => {
                if (data.success) {
                    dispatch(userSuccessAction(data.user));
                }
            })
            .catch((err) => {
                console.log(err);
                // if (localStorage.getItem('refreshToken')) {
                //     dispatch(updateToken());
                //     dispatch(getUser());
                // } else {
                    dispatch(userErrorAction())
                // }
            });
    }
    
}

export const updateUser: AppThunk = (email: string, name: string) => {
    return function (dispatch) {
        dispatch(updateUserRequestAction());
        fetch(baseUrl + "auth/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${getCookie('token')}`,
                },
                body: JSON.stringify({
                    email,
                    name
                }),
            })
            .then(checkResponse)
            .then((data) => {
                console.log(data)
                if (data.success) {
                    dispatch(updateUserSuccessAction(data.user));
                }
            })
            .catch((err) => {
                console.log(err);
                if (localStorage.getItem('refreshToken')) {
                    dispatch(updateToken());
                    dispatch(updateUser(email, name));
                } else {
                    dispatch(updateUserErrorAction())
                }
            });
    }
}

export const forgotPassword: AppThunk = (email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(forgotPasswordRequestAction());
        fetch(baseUrl + "password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                }),
            })
            .then(checkResponse)
            .then((res) => {
                if (res.success) {
                    dispatch(forgotPasswordSuccessAction());
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(forgotPasswordErrorAction())
            });
    }
}

export const resetPassword: AppThunk = (password: string, token: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(resetPasswordRequestAction());
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
            .then(checkResponse)
            .then((data) => {
                if (data.success) {
                    dispatch(resetPasswordSuccessAction());
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(resetPasswordErrorAction())
            });
    }
}

export type TAuthActions = 
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterErrorAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginErrorAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenErrorAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutErrorAction
    | IUserRequestAction
    | IUserSuccessAction
    | IUserErrorAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserErrorAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordErrorAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordErrorAction;
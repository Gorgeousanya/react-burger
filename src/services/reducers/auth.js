import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED } from '../actions/auth';

    const authInitialState = { 
        user: null,
        registerRequest: false,
        registerFailed: false,
        loggedIn: false,
        loginRequest: false,
        loginFailed: false,
        updateTokenRequest: false,
        updateTokenFailed: false,
        logoutRequest: false,
        logoutFailed: false,
        userRequest: false,
        userFailed: false,
        updateUserRequest: false,
        updateUserFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
    };

    export const authReducer = (state = authInitialState, action) => {
        switch (action.type) {
            case REGISTER_REQUEST: {
                return {
                    ...state,
                    registerRequest: true,
                    registerFailed: false,
                };
            }
                case REGISTER_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        registerRequest: false,
                        loggedIn: true
                    };
                }
                case REGISTER_FAILED: {
                    return {
                        ...state,
                        registerFailed: true,
                        registerRequest: false,
                    };
                }
                case LOGIN_REQUEST: {
                    return {
                        ...state,
                        loginRequest: true,
                        loginFailed: false,
                    };
                }
                case LOGIN_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        loginRequest: false,
                        loggedIn: true
                    };
                }
                case LOGIN_FAILED: {
                    return {
                        ...state,
                        loginFailed: true,
                        loginRequest: false,
                    };
                }
                case UPDATE_TOKEN_REQUEST: {
                    return {
                        ...state,
                        updateTokenRequest: true,
                        updateTokenFailed: false,
                    };
                }
                case UPDATE_TOKEN_SUCCESS: {
                    return {
                        ...state,
                        loggedIn: true,
                        updateTokenRequest: false,
                    };
                }
                case UPDATE_TOKEN_FAILED: {
                    return {
                        ...state,
                        updateTokenFailed: true,
                        updateTokenRequest: false,
                    };
                }
                case LOGOUT_REQUEST: {
                    return {
                        ...state,
                        logoutRequest: true,
                        logoutFailed: false,
                    };
                }
                case LOGOUT_SUCCESS: {
                    return {
                        ...state,
                        loggedIn: false,
                        user: null,
                    };
                }
                case LOGOUT_FAILED: {
                    return {
                        ...state,
                        logoutFailed: true,
                        logoutRequest: false,
                    };
                }
                case USER_REQUEST: {
                    return {
                        ...state,
                        userRequest: true,
                        userFailed: false,
                    };
                }
                case USER_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        loggedIn: true,
                        userRequest: false,
                    };
                }
                case USER_FAILED: {
                    return {
                        ...state,
                        userFailed: true,
                        userRequest: false,
                    };
                }
                case UPDATE_USER_REQUEST: {
                    return {
                        ...state,
                        updateUserRequest: true,
                        updateUserFailed: false,
                    };
                }
                case UPDATE_USER_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        updateUserRequest: false,
                    };
                }
                case UPDATE_USER_FAILED: {
                    return {
                        ...state,
                        updateUserFailed: true,
                        updateUserRequest: false,
                    };
                }
                case FORGOT_PASSWORD_REQUEST: {
                    return {
                        ...state,
                        forgotPasswordRequest: true,
                        forgotPasswordFailed: false,
                    };
                }
                case FORGOT_PASSWORD_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        forgotPasswordRequest: false,
                    };
                }
                case FORGOT_PASSWORD_FAILED: {
                    return {
                        ...state,
                        forgotPasswordFailed: true,
                        forgotPasswordRequest: false,
                    };
                }
                case RESET_PASSWORD_REQUEST: {
                    return {
                        ...state,
                        resetPasswordRequest: true,
                        resetPasswordFailed: false,
                    };
                }
                case RESET_PASSWORD_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        resetPasswordRequest: false,
                    };
                }
                case RESET_PASSWORD_FAILED: {
                    return {
                        ...state,
                        resetPasswordFailed: true,
                        resetPasswordRequest: false,
                    };
                }                                
            default:
                return state;
        }
    }
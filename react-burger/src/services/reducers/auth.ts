import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    USER_REQUEST,
    USER_SUCCESS,
    USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    TAuthActions
 } from '../actions/auth';

    export type TAuthState = {
        user: {
            name: string,
            email: string
        };
        registerRequest: boolean;
        registerError: boolean;
        loggedIn: any;
        loginRequest: boolean;
        loginError: boolean;
        updateTokenRequest: boolean;
        updateTokenError: boolean;
        logoutRequest: boolean;
        logoutError: boolean;
        userRequest: boolean;
        userError: boolean;
        updateUserRequest: boolean;
        updateUserError: boolean;
        forgotPasswordRequest: boolean;
        forgotPasswordError: boolean;
        resetPasswordRequest: boolean;
        resetPasswordError: boolean;
    };

    const authInitialState = { 
        user: {
            name: '',
            email: ''
        },
        registerRequest: false,
        registerError: false,
        loggedIn: undefined,
        loginRequest: false,
        loginError: false,
        updateTokenRequest: false,
        updateTokenError: false,
        logoutRequest: false,
        logoutError: false,
        userRequest: false,
        userError: false,
        updateUserRequest: false,
        updateUserError: false,
        forgotPasswordRequest: false,
        forgotPasswordError: false,
        resetPasswordRequest: false,
        resetPasswordError: false,
    };

    export const authReducer = (state = authInitialState, action: TAuthActions):TAuthState => {
        switch (action.type) {
            case REGISTER_REQUEST: {
                return {
                    ...state,
                    registerRequest: true,
                    registerError: false,
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
                case REGISTER_ERROR: {
                    return {
                        ...state,
                        registerError: true,
                        registerRequest: false,
                    };
                }
                case LOGIN_REQUEST: {
                    return {
                        ...state,
                        loginRequest: true,
                        loginError: false,
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
                case LOGIN_ERROR: {
                    return {
                        ...state,
                        loginError: true,
                        loginRequest: false,
                    };
                }
                case UPDATE_TOKEN_REQUEST: {
                    return {
                        ...state,
                        updateTokenRequest: true,
                        updateTokenError: false,
                    };
                }
                case UPDATE_TOKEN_SUCCESS: {
                    return {
                        ...state,
                        loggedIn: true,
                        updateTokenRequest: false,
                    };
                }
                case UPDATE_TOKEN_ERROR: {
                    return {
                        ...state,
                        updateTokenError: true,
                        updateTokenRequest: false,
                    };
                }
                case LOGOUT_REQUEST: {
                    return {
                        ...state,
                        logoutRequest: true,
                        logoutError: false,
                    };
                }
                case LOGOUT_SUCCESS: {
                    return {
                        ...state,
                        loggedIn: false,
                        user: {
                            name: '',
                            email: ''
                        },
                    };
                }
                case LOGOUT_ERROR: {
                    return {
                        ...state,
                        logoutError: true,
                        logoutRequest: false,
                    };
                }
                case USER_REQUEST: {
                    return {
                        ...state,
                        userRequest: true,
                        userError: false,
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
                case USER_ERROR: {
                    return {
                        ...state,
                        userError: true,
                        userRequest: false,
                        loggedIn: false
                    };
                }
                case UPDATE_USER_REQUEST: {
                    return {
                        ...state,
                        updateUserRequest: true,
                        updateUserError: false,
                    };
                }
                case UPDATE_USER_SUCCESS: {
                    return {
                        ...state,
                        user: action.user,
                        updateUserRequest: false,
                    };
                }
                case UPDATE_USER_ERROR: {
                    return {
                        ...state,
                        updateUserError: true,
                        updateUserRequest: false,
                    };
                }
                case FORGOT_PASSWORD_REQUEST: {
                    return {
                        ...state,
                        forgotPasswordRequest: true,
                        forgotPasswordError: false,
                    };
                }
                case FORGOT_PASSWORD_SUCCESS: {
                    return {
                        ...state,
                        forgotPasswordError: false,
                        forgotPasswordRequest: false,
                    };
                }
                case FORGOT_PASSWORD_ERROR: {
                    return {
                        ...state,
                        forgotPasswordError: true,
                        forgotPasswordRequest: false,
                    };
                }
                case RESET_PASSWORD_REQUEST: {
                    return {
                        ...state,
                        resetPasswordRequest: true,
                        resetPasswordError: false,
                    };
                }
                case RESET_PASSWORD_SUCCESS: {
                    return {
                        ...state,
                        resetPasswordError: false,
                        resetPasswordRequest: false,
                    };
                }
                case RESET_PASSWORD_ERROR: {
                    return {
                        ...state,
                        resetPasswordError: true,
                        resetPasswordRequest: false,
                    };
                }                                
            default:
                return state;
        }
    }
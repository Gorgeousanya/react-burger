import { authInitialState, authReducer } from './auth';
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

describe('Проверка auth reducer', () => {
    const user = { name: "Anna", email: "test@test.ru" };
    const userUpdate = { name: "Anya", email: "test@test.ru" };

    it('Проверка initialState', () => {
        expect(authReducer(undefined, {} as TAuthActions)).toEqual(authInitialState);
    });

    it('Проверка REGISTER_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: REGISTER_REQUEST,
        })).toEqual({
            ...authInitialState,
            registerRequest: true,
            registerError: false,
        });
    });

    it('Проверка REGISTER_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user: { name: "", email: "" }
        }, {
            type: REGISTER_SUCCESS,
            user
        })).toEqual({
            ...authInitialState,
            user,
            registerRequest: false,
            loggedIn: true
        });
    });

    it('Проверка REGISTER_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: REGISTER_ERROR,
        })).toEqual({
            ...authInitialState,
            registerError: true,
            registerRequest: false,
        });
    });

    it('Проверка LOGIN_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: LOGIN_REQUEST,
        })).toEqual({
            ...authInitialState,
            loginRequest: true,
            loginError: false,
        });
    });

    it('Проверка LOGIN_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user: { name: "", email: "" }
        }, {
            type: LOGIN_SUCCESS,
            user
        })).toEqual({
            ...authInitialState,
            user,
            loginRequest: false,
            loggedIn: true
        });
    });

    it('Проверка LOGIN_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: LOGIN_ERROR,
        })).toEqual({
            ...authInitialState,
            loginError: true,
            loginRequest: false,
        });
    });

    it('Проверка UPDATE_TOKEN_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_TOKEN_REQUEST,
        })).toEqual({
            ...authInitialState,
            updateTokenRequest: true,
            updateTokenError: false,
        });
    });

    it('Проверка UPDATE_TOKEN_SUCCESS', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_TOKEN_SUCCESS,
        })).toEqual({
            ...authInitialState,
            loggedIn: true,
            updateTokenRequest: false,
        });
    });

    it('Проверка UPDATE_TOKEN_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_TOKEN_ERROR,
        })).toEqual({
            ...authInitialState,
            updateTokenError: true,
            updateTokenRequest: false,
        });
    });

    it('Проверка LOGOUT_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: LOGOUT_REQUEST,
        })).toEqual({
            ...authInitialState,
            logoutRequest: true,
            logoutError: false,
        });
    });

    it('Проверка LOGOUT_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user
        }, {
            type: LOGOUT_SUCCESS,
        })).toEqual({
            ...authInitialState,
            loggedIn: false,
            user: { name: "", email: "" },
        });
    });

    it('Проверка LOGOUT_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: LOGOUT_ERROR,
        })).toEqual({
            ...authInitialState,
            logoutError: true,
            logoutRequest: false,
        });
    });

    it('Проверка USER_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: USER_REQUEST,
        })).toEqual({
            ...authInitialState,
            userRequest: true,
            userError: false,
        });
    });

    it('Проверка USER_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user: { name: "", email: "" }
        }, {
            type: USER_SUCCESS,
            user
        })).toEqual({
            ...authInitialState,
            user,
            loggedIn: true,
            userRequest: false,
        });
    });

    it('Проверка USER_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: USER_ERROR,
        })).toEqual({
            ...authInitialState,
            userError: true,
            userRequest: false,
            loggedIn: false
        });
    });

    it('Проверка UPDATE_USER_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_USER_REQUEST,
        })).toEqual({
            ...authInitialState,
            updateUserRequest: true,
            updateUserError: false,
        });
    });

    it('Проверка UPDATE_USER_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user
        }, {
            type: UPDATE_USER_SUCCESS,
            user: userUpdate
        })).toEqual({
            ...authInitialState,
            user: userUpdate,
            updateUserRequest: false,
        });
    });

    it('Проверка UPDATE_USER_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_USER_ERROR,
        })).toEqual({
            ...authInitialState,
            updateUserError: true,
            updateUserRequest: false,
        });
    });

    it('Проверка FORGOT_PASSWORD_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: FORGOT_PASSWORD_REQUEST,
        })).toEqual({
            ...authInitialState,
            forgotPasswordRequest: true,
            forgotPasswordError: false,
        });
    });

    it('Проверка FORGOT_PASSWORD_SUCCESS', () => {
        expect(authReducer(authInitialState, {
            type: FORGOT_PASSWORD_SUCCESS,
        })).toEqual({
            ...authInitialState,
            forgotPasswordRequest: false,
            forgotPasswordError: false,
        });
    });

    it('Проверка FORGOT_PASSWORD_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: FORGOT_PASSWORD_ERROR,
        })).toEqual({
            ...authInitialState,
            forgotPasswordError: true,
            forgotPasswordRequest: false,
        });
    });

    it('Проверка RESET_PASSWORD_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: RESET_PASSWORD_REQUEST,
        })).toEqual({
            ...authInitialState,
            resetPasswordRequest: true,
            resetPasswordError: false,
        });
    });

    it('Проверка RESET_PASSWORD_SUCCESS', () => {
        expect(authReducer(authInitialState, {
            type: RESET_PASSWORD_SUCCESS,
        })).toEqual({
            ...authInitialState,
            resetPasswordRequest: false,
            resetPasswordError: false,
        });
    });

    it('Проверка RESET_PASSWORD_ERROR', () => {
        expect(authReducer(authInitialState, {
            type: RESET_PASSWORD_ERROR,
        })).toEqual({
            ...authInitialState,
            resetPasswordError: true,
            resetPasswordRequest: false,
        });
    });
});
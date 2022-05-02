import { CHANGE_SORT, SET_TAB, ADD_INGREDIENT, DELETE_INGREDIENT, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, CLEAR_ORDER, SET_ORDER, OPEN_MODAL, OPEN_MODAL_ORDER, CLOSE_MODAL, CLOSE_MODAL_ORDER,
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
    RESET_PASSWORD_FAILED } from '../actions';

const initialState = { 
    tab: "one",
    ingredients: [],
    ingredientsLoading: false,
    ingredientsError: null,
    constructor: [],
    modal: false,
    modalOrder: false,
    order: {},
    orderLoading: false,
    orderError: null,
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

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsLoading: true,
                ingredientsError: null
            }   
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsLoading: false,
                ingredientsError: null,
                ingredients: action.data
            }                       
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredientsLoading: false,
                ingredientsError: action.error
            } 
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true,
                orderError: null,
                order: {}
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderLoading: false,
                orderError: null,
                order: action.data
            }
        case GET_ORDER_ERROR:
            return {
                ...state,
                orderLoading: false,
                orderError: action.error
            }           
        case ADD_INGREDIENT:
            return {
                ...state,
                constructor:
                    state.constructor 
                    ? action.item.type === "bun" ? [...state.constructor, action.item, action.item] : [...state.constructor, action.item]
                    : action.item.type === "bun" ? [action.item, action.item]: [action.item]
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                constructor: 
                    [...state.constructor].filter((item) => item.uuid!==action.id)
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal: action.item
            }
        case OPEN_MODAL_ORDER:
            return {
                ...state,
                modalOrder: true
            }            
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false
            }   
        case CLOSE_MODAL_ORDER:
            return {
                ...state,
                modalOrder: false
            }                                 
        case SET_TAB:
            return {
                ...state,
                tab: action.tab
            }           
        case SET_ORDER:
            return {
                ...state,
                order: action.data
            }
        case CLEAR_ORDER:
            return {
                ...state,
                order: {},
                constructor: [],
            }            
        case CHANGE_SORT:
            const items = state.constructor.filter(item => item.type!=="bun");
            const bun = state.constructor.filter(ingredient => ingredient.type === 'bun');
            const other=[...items];
            const drag = other.splice(action.drag, 1)[0];
            other.splice(action.hover, 0, drag)
            return {
                ...state,
                constructor: [...bun, ...other]
            }   
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
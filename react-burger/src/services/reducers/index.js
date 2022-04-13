import { CHANGE_SORT, SET_TAB, ADD_INGREDIENT, DELETE_INGREDIENT, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, CLEAR_ORDER, SET_ORDER, OPEN_MODAL, OPEN_MODAL_ORDER, CLOSE_MODAL, CLOSE_MODAL_ORDER } from '../actions';

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
    orderError: null
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
                    ? action.item.type === "bun" 
                        ? [...state.constructor, action.item, action.item]
                        : [...state.constructor, action.item]
                    : action.item.type === "bun"
                        ? [action.item, action.item]
                        : [action.item]
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                constructor: 
                    [...state.constructor].filter((item) => item._id!==action.id)
                
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
            console.log(other)
            const drag = other.splice(action.drag, 1)[0];
            console.log(drag, other);
            other.splice(action.hover, 0, drag)
            console.log(other)
            return {
                ...state,
                constructor: [...bun, ...other]
            }                           
        default:
            return state;
    }
}
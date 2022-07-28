import { TBurgerActions, CHANGE_SORT, SET_TAB, ADD_INGREDIENT, DELETE_INGREDIENT, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, RESET_ORDER, OPEN_MODAL, OPEN_MODAL_ORDER, CLOSE_MODAL, CLOSE_MODAL_ORDER,
} from '../actions/burger';
import { TIngredient, IOrderState } from '../../utils/types';

type TBurgerState = {
    tab: string,
    ingredients: Array<TIngredient>,
    ingredientsLoading: boolean,
    ingredientsError: boolean,
    constructor: Array<TIngredient>,
    modal: boolean,
    modalOrder: boolean,
    order: IOrderState,
    orderLoading: boolean,
    orderError: boolean,
  };

export const burgerInitialState: TBurgerState = { 
    tab: "one",
    ingredients: [],
    ingredientsLoading: false,
    ingredientsError: false,
    constructor: [],
    modal: false,
    modalOrder: false,
    order: {} as IOrderState,
    orderLoading: false,
    orderError: false,
};

export const burgerReducer = (state = burgerInitialState, action: TBurgerActions): TBurgerState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsLoading: true,
                ingredientsError: false
            }   
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsLoading: false,
                ingredientsError: false,
                ingredients: action.data
            }                       
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredientsError: true,
                ingredientsLoading: false,
            } 
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true,
                orderError: false,
                order: {} as IOrderState
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderLoading: false,
                orderError: false,
                order: action.data 
            }
        case GET_ORDER_ERROR:
            return {
                ...state,
                orderLoading: false,
                orderError: true
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
                    [...state.constructor].filter((item: TIngredient) => item.uuid!==action.id)
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal: true
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
        case RESET_ORDER:
            return {
                ...state,
                order: {} as IOrderState,
                constructor: [],
            }            
        case CHANGE_SORT:
            const items = state.constructor.filter((item: TIngredient) => item.type!=="bun");
            const bun = state.constructor.filter((ingredient: TIngredient) => ingredient.type === 'bun');
            const other=[...items];
            const drag = other.splice(action.drag, 1)[0];
            other.splice(action.hover, 0, drag)
            return {
                ...state,
                constructor: [...bun, ...other]
            }                          
        default:
            return state;
    }
}


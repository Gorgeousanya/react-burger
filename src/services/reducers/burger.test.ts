import {
    TBurgerActions, CHANGE_SORT, SET_TAB, ADD_INGREDIENT, DELETE_INGREDIENT, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, RESET_ORDER, OPEN_MODAL, OPEN_MODAL_ORDER, CLOSE_MODAL, CLOSE_MODAL_ORDER,
} from '../actions/burger';
import { burgerInitialState, burgerReducer } from './burger';

describe('Проверка burger reducer', () => {
    const ingredient = [{
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
        uuid: "df0f9eb2-12a3-4868-852f-836a14fc4623",
    },
    {
        calories: 420,
        carbohydrates: 53,
        fat: 244,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        name: "Мясо бессмертных моллюсков Protostomia",
        price: 1337,
        proteins: 433,
        type: "main",
        __v: 0,
        _id: "60d3b41abdacab0026a733c9",
        uuid: "b1da744d-9a80-48a0-bba4-37a4ad1adadc",
    },
    {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        name: "Соус фирменный Space Sauce",
        price: 80,
        proteins: 50,
        type: "sauce",
        __v: 0,
        _id: "60d3b41abdacab0026a733cd",
        uuid: "df0f9eb2-12a3-4868-852f-836a14fc4623",
    },
    ];

    it('Проверка initialState', () => {
        expect(burgerReducer(undefined, {} as TBurgerActions)).toEqual(burgerInitialState);
    });

    it('Проверка ADD_INGREDIENT', () => {
        expect(burgerReducer({
            ...burgerInitialState,
            constructor: []
        }, {
            type: ADD_INGREDIENT,
            item: ingredient[0]
        })).toEqual({
            ...burgerInitialState,
            constructor: [ingredient[0], ingredient[0]]
        });
    });

    it('Проверка DELETE_INGREDIENT', () => {
        expect(burgerReducer({
            ...burgerInitialState,
            constructor: [ingredient[0], ingredient[1]]
        }, {
            type: DELETE_INGREDIENT,
            id: ingredient[1].uuid
        })).toEqual({
            ...burgerInitialState,
            constructor: [ingredient[0]]
        });
    });

    it('Проверка CHANGE_SORT', () => {
        expect(burgerReducer({
            ...burgerInitialState,
            constructor: [ingredient[1], ingredient[2]]
        }, {
            type: CHANGE_SORT,
            drag: 1,
            hover: 0
        })).toEqual({
            ...burgerInitialState,
            constructor: [ingredient[2], ingredient[1]]
        });
    });

    it('Проверка SET_TAB', ()=>{
        const tab = 'one'
        expect(burgerReducer({
            ...burgerInitialState,
        }, {
            type: SET_TAB,
            tab
        })).toEqual({
            ...burgerInitialState,
            tab
        });
    });

    it('Проверка RESET_ORDER', () => {
        expect(burgerReducer({
            ...burgerInitialState,
        }, {
            type: RESET_ORDER,
        })).toEqual({
            ...burgerInitialState,
            constructor: [],
            order: {}
        });
    });

    it('Проверка GET_INGREDIENTS_REQUEST', () => {
        expect(burgerReducer(burgerInitialState, {
            type: GET_INGREDIENTS_REQUEST,
        })).toEqual({
            ...burgerInitialState,
            ingredientsLoading: true,
            ingredientsError: false
        });
    });

    it('Проверка GET_INGREDIENTS_SUCCESS', () => {

        expect(burgerReducer(burgerInitialState, {
            type: GET_INGREDIENTS_SUCCESS,
            data: ingredient
        })).toEqual({
            ...burgerInitialState,
            ingredients: ingredient,
            ingredientsLoading: false,
            ingredientsError: false,
        });
    });

    it('Проверка GET_INGREDIENTS_ERROR', () => {
        expect(burgerReducer(burgerInitialState, {
            type: GET_INGREDIENTS_ERROR,
        })).toEqual({
            ...burgerInitialState,
            ingredientsError: true,
        });
    });

    it('Проверка OPEN_MODAL', () => {
        expect(burgerReducer(burgerInitialState, {
            type: OPEN_MODAL,
            item: ingredient[0],
        })).toEqual({
            ...burgerInitialState,
            modal: true
        });
    });

    it('Проверка CLOSE_MODAL', () => {
        expect(burgerReducer(burgerInitialState, {
            type: CLOSE_MODAL,
        })).toEqual({
            ...burgerInitialState,
            modal: false
        });
    });

    it('Проверка GET_ORDER_REQUEST', () => {
        expect(burgerReducer(burgerInitialState, {
            type: GET_ORDER_REQUEST,
        })).toEqual({
            ...burgerInitialState,
            orderLoading: true,
            orderError: false,
            order: {}
        });
    });

    it('Проверка GET_ORDER_SUCCESS', () => {
        const order = {
            orderSuccess: true,
            orderRequest: true,
            orderFailed: false,
            success: true,
            name: 'Space бургер',
            order: {
                number: 1,
                name: 'Space бургер',
                success: true
            }
        }
        expect(burgerReducer(burgerInitialState, {
            type: GET_ORDER_SUCCESS,
            data: order
        })).toEqual({
            ...burgerInitialState,
            orderLoading: false,
            orderError: false,
            order
        });
    });

    it('Проверка GET_ORDER_ERROR', () => {
        expect(burgerReducer(burgerInitialState, {
            type: GET_ORDER_ERROR,
        })).toEqual({
            ...burgerInitialState,
            orderLoading: false,
            orderError: true
        });
    });

    it('Проверка OPEN_MODAL_ORDER', () => {
        expect(burgerReducer(burgerInitialState, {
            type: OPEN_MODAL_ORDER,
        })).toEqual({
            ...burgerInitialState,
            modalOrder: true
        });
    });

    it('Проверка CLOSE_MODAL_ORDER', () => {
        expect(burgerReducer(burgerInitialState, {
            type: CLOSE_MODAL_ORDER,
        })).toEqual({
            ...burgerInitialState,
            modalOrder: false
        });
    });
});
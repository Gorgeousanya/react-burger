
export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid: string;
}

export interface IOrderState {
    orderSuccess: boolean;
    orderRequest: boolean;
    orderFailed: boolean;
    success: boolean;
    name: string;
    order: {
        number?: number;
        name?: string;
        success: boolean;
    };
}

export type TOrder = {
    ingredients: Array<Pick<TIngredient, '_id'> | string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
  };

export type TOrders = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export type TOrderInfo = {
    number: number;
    status: string;
    createdAt: string;
    name: string;
    ingredientsId: Array<string| Pick<TIngredient, "_id">>;
    id: string;
}
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../services/store';
import { TAuthActions } from '../services/actions/auth';
import { TBurgerActions } from '../services/actions/burger'
import { TFeedActions } from '../services/actions/feed';

type TApplicationActions = TAuthActions | TBurgerActions | TFeedActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export function setCookie(name: string, value: string, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
          updatedCookie += '=' + propValue;
      }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') //eslint-disable-line
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export function checkResponse(res: Response) {
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const formatStatus = (status: string): string => {
  if (status === "done") {
    return "Выполнен";
  } else if (status === "pending") {
    return "Готовится";
  } else {
    return "Создан";
  }
};
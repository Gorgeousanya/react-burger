import styles from './pages.module.css';
import { Redirect, useHistory } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../services/hooks';
import { register } from '../services/actions/auth';

export default function RegisterPage() {
    const history = useHistory();
    const inputRef = useRef<HTMLInputElement>(null)
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.loggedIn);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onLogin = () => {
        history.replace({ pathname: '/login' });
    };

    const onSubmit = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        dispatch(register(form.email, form.password, form.name));
    };

    if (loggedIn) {
        return (
            <Redirect to={"/"} />
        );
    }

    return (
        <div className={styles.App}>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <p className="text text_type_main-medium">
                        Регистрация
                    </p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.input}>
                        <Input
                            type='text'
                            placeholder='Имя'
                            onChange={onChange}
                            value={form.name}
                            name='name'
                            error={false}
                            ref={inputRef}
                            errorText={'Ошибка'}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            type='text'
                            placeholder='E-mail'
                            onChange={onChange}
                            value={form.email}
                            name='email'
                            error={false}
                            ref={inputRef}
                            errorText={'Ошибка'}
                        />
                    </div>
                    <div className={styles.input}>
                        <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                    </div>
                    <Button type="primary" size="medium" >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
            <div className={styles.save}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегестрированы?
                </p>
                <Button type="secondary" size="medium" onClick={onLogin}>
                    Войти
                </Button>
            </div>
        </div>
    );
}
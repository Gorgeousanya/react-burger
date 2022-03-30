import React from 'react';
import { Tab, Button, Logo, BurgerIcon, CloseIcon, ProfileIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';
const modalRoot = document.getElementById('modals') || document.body;

export default function Modal(props: any) {
    React.useEffect(() => {
        const handleEscape = (e: any) => {
            e.key == "Escape" && props.onClose();
        }
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [props.onClose])
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <><ModalOverlay onClick={props.onClose} />
            <div className={styles.modal} >
                <div className={styles.header}>
                    <p className="text text_type_main-large">
                        {props.message}
                    </p>
                    <div className={styles.button}>
                        <Button type="secondary" size="small" onClick={props.onClose} >
                            <CloseIcon type="primary" />
                        </Button>
                    </div>
                </div>
                {props.children}
            </div>
            
        </>
        , modalRoot);
}
import { useEffect, FC, ReactNode } from 'react';
import { Button, CloseIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.css';

type TModal = {
    children?: ReactNode,
    isOpen: boolean,
    onClose: () => void
}

const modalRoot = document.getElementById('modals') || document.body;

export const Modal: FC<TModal> = ({ onClose, isOpen, children }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            e.code === "Escape" && onClose();
        }
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [onClose])
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={styles.modal} >
                <div className={styles.header}>
                    <div className={styles.button}>
                        <Button type="secondary" size="small" onClick={onClose} >
                            <CloseIcon type="primary" />
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </>
        , modalRoot);
}


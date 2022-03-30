import styles from './modal.module.css';

export default function ModalOverlay (props: any) {
    return (
       <div onClick={props.onClick} className={styles.modaloverlay}>
        {props.children}
       </div>
       )
    }
    
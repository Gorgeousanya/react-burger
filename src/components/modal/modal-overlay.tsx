import styles from './modal.module.css';

type TModalOverlay = {
   children?: React.ReactNode,
   onClick: ()=>void
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ModalOverlay: React.FC<TModalOverlay> = ({children, onClick}) => {
   return (
      <div onClick={onClick} className={styles.modaloverlay}>
         {children}
      </div>
   )
}



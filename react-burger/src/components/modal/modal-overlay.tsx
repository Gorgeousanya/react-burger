import styles from './modal.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay(props: any) {
   return (
      <div onClick={props.onClick} className={styles.modaloverlay}>
         {props.children}
      </div>
   )
}

ModalOverlay.propTypes = {
   children: PropTypes.node,
   onClick: PropTypes.func.isRequired,
}

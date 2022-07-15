import { useContext} from 'react';
import ModalContext from '../../contexts/modal-context';
import './confirm-modal.scss';
import {removeContact} from '../../services/contact.service'

const ConfirmModal = ({userToEdit}) => {
  const modalContext = useContext(ModalContext);

  const onClose = () => {
    modalContext.closeModal();
  };

  const handleDeleteContact =()=>{
    removeContact(userToEdit.id).then((response)=>{
      ;
      onClose();
    });
  }

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
          <div className="field">
            <label className="label">
              Do you want to delete contact name: {userToEdit.firstName}          
            </label>
            <div className="button">
              <button onClick={()=>handleDeleteContact()}>Confirm</button>
              <button onClick={()=>onClose()}>Cancel</button>
          </div>
          </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default ConfirmModal;

import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import ModalContext from '../../contexts/modal-context';
import './contacts.scss';
import ConfirmModal from '../../components/confirm-modal';

const ContactsPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const BuildButton =(contact, name)=>
  {
    var functionToExecute = name ==="Edit" ? ()=> handleEditContact(contact) : ()=>handleDeleteContact(contact);
    return <button title={name} onClick={functionToExecute}>{name}</button>
  }

  const emptyUserToEdit=()=>{
    setUserToEdit({});
  }

  const handleEditContact =(contact)=>{
    setUserToEdit(contact); 
    setShowModal(true);
  }

  const handleDeleteContact=(contact)=>{
    setUserToEdit(contact); 
    setShowConfirmDelete(true);
  }

  useEffect(() => {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            <th key="id">Id</th>
            <th key="lastName">Last Name</th>
            <th key="firstName">First Name</th>
            <th key="emailAddress">Email Address</th>
            <th key="phoneTypes">Phone Types</th>
            <th key="Edit">Edit </th>
            <th key="Remove">Remove</th>
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data
          .sort((a, b) => a.id - b.id)
          .map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key="id">{row.id}</td>
              <td key="lastName">{row.lastName}</td>
              <td key="firstName">{row.firstName}</td>
              <td key="emailAddress">{row.emailAddress}</td>
              <td key="phoneTypes">{row.phoneNumbers.map((p) => p.phoneType).join(', ')}</td>
              <td key="editIcon">{BuildButton(row,'Edit')}</td>
              <td key="removeIcon">{BuildButton(row, 'Remove')}</td>
            </tr>
          ));
        setTableRows(rows);
      }
    });
  }, [showModal, showConfirmDelete]);

  const GetIfIsEditing=()=>{
    return userToEdit.firstName ===undefined;
  }

  return (
    <div className="contacts-page">
      <div className="section">
        <div className="container">
          <div className="container page-header">
            <h6 className="title">Contacts</h6>
            <button className="button is-primary create-contact-button" onClick={() => {console.log(userToEdit); setShowModal(true)}}>
              Create Contact
            </button>
          </div>
          <hr />
          <table className="table is-fullwidth is-hoverable">
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      <ModalContext.Provider value={{ showModal: showModal, closeModal: () => setShowModal(false) }}>
        <ContactModal isEditing={userToEdit.firstName !==undefined} userToEdit={userToEdit} setEmptyUserToEdit={emptyUserToEdit}/>
      </ModalContext.Provider>
      <ModalContext.Provider value={{showModal:showConfirmDelete, closeModal:()=>setShowConfirmDelete(false)}}>
        <ConfirmModal userToEdit={userToEdit}/>
      </ModalContext.Provider>
    </div>
  );
};

export default ContactsPage;

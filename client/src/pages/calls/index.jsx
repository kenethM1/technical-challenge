import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import ModalContext from '../../contexts/modal-context';
import './calls.scss';
import ConfirmModal from '../../components/confirm-modal';

const CallPage = () => {
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

  const handleEditContact =(contact)=>{
    setUserToEdit(contact); 
    setShowModal(true);
  }

  const handleDeleteContact=(contact)=>{
    setUserToEdit(contact); 
    setShowConfirmDelete(true);
  }

  const SortByLastAndFirstName=(a,b)=>{
    if (a.firstName === b.firstName){
      return a.firstName < b.firstName ? -1 : 1
    } else {
      return a.lastName < b.lastName ? -1 : 1
    }
  }

  useEffect(() => {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            <th key="lastName">Last Name</th>
            <th key="firstName">First Name</th>    
            <th key="homePhoneNumber">Home Phone Number</th>
          </tr>
        );
        setTableHeaders(headers);
          var newResponse = response.data.filter(e=>e.phoneNumbers.some(d=>d.phoneType === "Home"));
          ;
        const rows = newResponse          
          .sort((a,b)=> SortByLastAndFirstName(a,b))
          .map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key="lastName">{row.lastName}</td>
              <td key="firstName">{row.firstName}</td>
              <td key="homePhoneNumber">{row.phoneNumbers.filter(e=> e.phoneType=="Home").map((p) => p.phoneNumber).join(', ')}</td>
            </tr>
          ));
        setTableRows(rows);
      }
    });
  }, [showModal]);

  return (
    <div className="call-page">
      <div className="section">
        <div className="container">
          <div className="container page-header">
            <h6 className="title">Calls</h6>           
          </div>
          <hr />
          <table className="table is-fullwidth is-hoverable">
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallPage;

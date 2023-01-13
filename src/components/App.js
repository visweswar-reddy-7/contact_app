import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from "./Header";
import AddContact from "./AddContact"
import ContactList from "./ContactList";

function App() {
  const LOCAL_STORAGE = "contacts";
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE)) ?? [] );
  var maxId = parseInt(localStorage.getItem("max_id")) + 1;
  const [id, setId] = useState( maxId || 0);

  const addContactHandler = (contact) => {
    console.log(contact);
    // setContacts([...contacts, {id : (contacts.length), ...contact}]);
    setContacts([...contacts, {id, ...contact}]);

    setId((prevId) => ++prevId);
    localStorage.setItem("max_id", id);
  };

  const removeContact = (id) => {
    const newContactsList = contacts.filter ((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactsList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler = {addContactHandler}/>
      <ContactList contacts = {contacts} getContactId = {removeContact}/>
    </div>
  );
}

export default App;

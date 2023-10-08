import { useDispatch, useSelector } from 'react-redux';
import { ContactListStyled, ListElement } from './ContactList.styled';
import { selectContacts, selectFilteredContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/api';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(fetchContacts());
  }, [dispach]);

  return (
    <>
      {contacts.isLoading && <p>Loading...</p>}
      {contacts.error && <p>Somethink get wrong try again</p>}
      {contacts.list.length ? (
        filteredContacts.length ? (
          <ContactListStyled>
            {filteredContacts.map(({ id, name, phone }) => (
              <ListElement key={id}>
                <p>
                  {name}: {phone}
                </p>
                <button
                  type="button"
                  id={id}
                  onClick={e => dispach(deleteContact(e.target.id))}
                >
                  Delete
                </button>
              </ListElement>
            ))}
          </ContactListStyled>
        ) : (
          <p>No contacts with this name</p>
        )
      ) : (
        <p>No contacts</p>
      )}
    </>
  );
};

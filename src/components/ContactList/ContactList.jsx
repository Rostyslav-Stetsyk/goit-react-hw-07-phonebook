import { useDispatch, useSelector } from 'react-redux';
import { ContactListStyled, ListElement } from './ContactList.styled';
import { deleteContact } from 'redux/contactSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispach = useDispatch();

  return (
    <ContactListStyled>
      {contacts
        .filter(el => el.name.toLowerCase().includes(filter))
        .map(({ id, name, number }) => (
          <ListElement key={id}>
            <p>
              {name}: {number}
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
  );
};

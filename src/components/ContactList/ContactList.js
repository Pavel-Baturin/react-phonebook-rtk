import { useSelector } from 'react-redux';
import { useGetContactQuery } from 'redux/contacts/contactApi';
import { TailSpin } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import s from './ContactList.module.css';

export default function ContactList() {
  const { data: contacts, isFetching, error, isError } = useGetContactQuery();

  const filter = useSelector(state => state.filter.value);
  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filtredContacts = getFiltredContacts();

  return (
    <ul className={s.list}>
      {isFetching && <TailSpin color="lightblue" height={200} width={200} />}
      {isError && (
        <div
          className={s.error}
        >{`ERROR: ${error.status} ${error.data.message}`}</div>
      )}
      {filtredContacts &&
        !isFetching &&
        filtredContacts.map(({ id, name, number }) => (
          <ContactItem key={id} contactId={id} name={name} number={number} />
        ))}
    </ul>
  );
}

ContactList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  number: PropTypes.string,
};

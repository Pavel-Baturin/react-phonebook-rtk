import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contacts/contactApi';
import s from './ContactItem.module.css';

function ContactItem({ contactId, name, number }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <>
      <li className={s.item}>
        {name}: {number}
        <button
          disabled={isLoading}
          className={s.button}
          type="button"
          onClick={() => {
            deleteContact(contactId);
          }}
        >
          {isLoading ? (
            <ThreeDots color="lightblue" height={15} width={40} />
          ) : (
            'Delete'
          )}
        </button>
      </li>
    </>
  );
}

ContactItem.propTypes = {
  contactId: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactItem;

import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  ErrorMessageStyled,
  FieldWrapper,
  FormStyled,
  Label,
} from './ContactForm.styled';
import { ButtonSubmit } from 'components/Section/Section.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/api';
import { selectContacts } from 'redux/selectors';
import toast from 'react-hot-toast';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .length(12, `Number must have 12 symbols`)
    .trim()
    .matches(
      /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
      'Number must be in the format 111-111-1111'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispach = useDispatch();

  const onSubmit = (contact, actions) => {
    if (
      contacts.list.some(el => {
        if (el.name === contact.name) {
          toast.error('This name allready in contact list.');
          return true;
        }
        if (el.phone === contact.phone) {
          toast.error('This phone allready in contact list.');
          return true;
        }
        return false;
      })
    )
      return;
    dispach(addContact(contact));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          phone: '',
        }}
        validationSchema={contactSchema}
        onSubmit={onSubmit}
      >
        <FormStyled>
          <FieldWrapper>
            <Label htmlFor="name">Name</Label>
            <Field id="name" name="name" placeholder="Jane" maxlength="50" />
            <ErrorMessageStyled component="div" name="name" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="phone">Number</Label>
            <Field
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              maxlength="12"
            />
            <ErrorMessageStyled component="div" name="phone" />
          </FieldWrapper>

          <ButtonSubmit type="submit">Submit</ButtonSubmit>
        </FormStyled>
      </Formik>
    </>
  );
};

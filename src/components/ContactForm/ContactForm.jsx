import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormikForm,
  FormikLabel,
  FormikInput,
  FormikError,
  FormikButton,
} from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required('name is a required field'),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('number is a required field'),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values, resetForm);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <FormikLabel htmlFor="name">
          Name
          <FormikInput type="text" name="name" />
          <FormikError name="name" component="p" />
        </FormikLabel>
        <FormikLabel htmlFor="number">
          Number
          <FormikInput type="tel" name="number" />
          <FormikError name="number" component="p" />
        </FormikLabel>
        <FormikButton type="submit">Add contact</FormikButton>
      </FormikForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

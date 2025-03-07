import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      "Invalid number format. Example: 459-12-56"
    )
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};
const ContactForm = ({ addContact }) => {
  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    addContact(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.continput}>
          <label htmlFor="name">Name</label>
          <Field className={css.field} type="text" id="name" name="name" />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.continput}>
          <label htmlFor="number">Number</label>
          <Field className={css.field} type="text" id="number" name="number" />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
export default ContactForm;

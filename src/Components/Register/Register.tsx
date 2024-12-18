import { Component } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { createForm } from '@modular-forms/solid';
import { register } from '../../services/account.service';

// Define the specific form fields
interface RegisterFormFields {
  name: string;
  userName: string;
  email: string;
  password: string;
}

type RegisterFormValues = RegisterFormFields & { [key: string]: any };

const Register: Component = () => {
  const navigate = useNavigate();

  const [form, { Form, Field }] = createForm<RegisterFormValues>();

  const handleSubmit = (values: RegisterFormValues) => {
    console.log('Form values:', values);

    const registrationData: RegisterFormFields = {
      name: values.name,
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    register(registrationData)
      .then((data) => {
        console.log('Registration successful:', data);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration failed:', error);

        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert('Registration failed. Please try again later.');
        }
      });
  };

  return (
    <div class="register-container">
      <Form onSubmit={handleSubmit}>
        <Field name="name">
          {(field, props) => (
            <input {...props} placeholder="Name" />
          )}
        </Field>
        <Field name="userName">
          {(field, props) => (
            <input {...props} placeholder="Username" />
          )}
        </Field>
        <Field name="email">
          {(field, props) => (
            <input {...props} placeholder="Email" type="email" />
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <input {...props} placeholder="Password" type="password" />
          )}
        </Field>
        <button type="submit">Register</button>
      </Form>
    </div>
  );
};

export default Register;

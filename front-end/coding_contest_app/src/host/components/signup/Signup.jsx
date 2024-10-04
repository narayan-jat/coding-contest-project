import React, {useContext} from 'react';
import {TextInputField} from '../../../utilities/FormComponents';
import {useNavigate, Link} from 'react-router-dom';
import './Signup.css';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import {useFormHandler} from '../contest creation/FormHandlers';

const SignUp = () => {
  const navigate = useNavigate ();
  const {user, signup} = useContext (AuthContext);
  const {formData: signUpData, handleInputChange} = useFormHandler ({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      await signup (signUpData.email, signUpData.password, signUpData.name);
      navigate ('/host');
      console.log ('user data: ', user);
    } catch (e) {
      console.log (e);
    }
  };

  const signUpFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      controlClass: 'form-control-custom',
      placeholder: 'Enter your name',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      controlClass: 'form-control-custom',
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      controlClass: 'form-control-custom',
      placeholder: 'Enter your password',
    },
  ];

  return (
    <div className="signup-form">
      <div>
        <h1>Code Hut</h1>
        <h2>Sign Up</h2>
      </div>
      <div className="signup-input-fields">
        <Form>
          {signUpFields.map ((field, index) => (
            <TextInputField
              key={index}
              label={field.label}
              name={field.name}
              type={field.type}
              value={signUpData[field.name]}
              onChange={handleInputChange}
              groupClass={'signup-input-field'}
              placeholder={field.placeholder}
              controlClass={'input-field'}
            />
          ))}
        </Form>
      </div>
      <div className="signup-form-footer">
        <Button className="signup-btn" onClick={handleSubmit}>Submit</Button>
        <div className="signup-footer-text">
          <p className="signup-footer-text">
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

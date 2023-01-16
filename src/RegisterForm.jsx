import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(()=>{
  //   alert(JSON.stringify(errors));
  // },[errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validate();
    if(isValidated){
      console.log(formData);

      //sending formdata as a request to backend server
      const response = await fetch("http://localhost:8000/register",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if(response.status === 200){
        alert("Registered");
      }else{
        const error = await response.json();
        alert(error.error);
      }
    }
  };

  return (
    <div className="container">
    <div className='registrationContainer' >
    <form className='RegisterForm'onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <span className='inputError'>{errors.name}</span>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <span className='inputError'>{errors.email}</span>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <span className='inputError'>{errors.password}</span>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <span className='inputError'>{errors.confirmPassword}</span>
      </div>

      <button className='registerButton' type='submit'>Register</button>

      <small>Already have an account? <a href="/login ">Login</a></small>
      
    </form>
    </div>
    </div>
  );
}

export default RegisterForm;

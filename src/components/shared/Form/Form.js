// src/components/shared/Form/Form.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from '../../../services/authService';
import InputType from './InputType';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Divider,
} from '@mui/material';

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donar');
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  let formContent;

  switch (formType) {
    case 'login':
      formContent = (
        <>
          <InputType
            labelText="Email"
            labelFor="forEmail"
            inputType="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputType
            labelText="Password"
            labelFor="forPassword"
            inputType="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      );
      break;
    case 'register':
      formContent = (
        <>
          {(role === 'admin' || role === 'donar') && (
            <InputType
              labelText="Name"
              labelFor="forName"
              inputType="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <InputType
            labelText="Email"
            labelFor="forEmail"
            inputType="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputType
            labelText="Password"
            labelFor="forPassword"
            inputType="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {role === 'organisation' && (
            <InputType
              labelText="Organisation Name"
              labelFor="forOrganisationName"
              inputType="text"
              name="organisationName"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
            />
          )}
          {role === 'hospital' && (
            <InputType
              labelText="Hospital Name"
              labelFor="forHospitalName"
              inputType="text"
              name="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          )}
          <InputType
            labelText="Website"
            labelFor="forWebsite"
            inputType="url"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <InputType
            labelText="Address"
            labelFor="forAddress"
            inputType="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputType
            labelText="Phone"
            labelFor="forPhone"
            inputType="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </>
      );
      break;
    default:
      console.warn(`Unexpected formType: ${formType}`);
      formContent = null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'login') {
      handleLogin(e, email, password, role);
    } else if (formType === 'register') {
      handleRegister(
        e,
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {formTitle}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Role</FormLabel>
        <RadioGroup
          row
          aria-label="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <FormControlLabel value="donar" control={<Radio />} label="Donar" />
          {formType === 'login' && (
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          )}
          <FormControlLabel value="hospital" control={<Radio />} label="Hospital" />
          <FormControlLabel value="organisation" control={<Radio />} label="Organisation" />
        </RadioGroup>
      </FormControl>
      {formContent}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        {formType === 'login' ? (
          <Typography variant="body2">
            Not Registered Yet?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Register Here!
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2">
            Already a User?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Login Here!
            </Link>
          </Typography>
        )}
        <Button variant="contained" color="primary" type="submit">
          {submitBtn}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;

// src/components/shared/InputType.js
import React from 'react';
import TextField from '@mui/material/TextField';

const InputType = ({ value, onChange, name, inputType, labelText, labelFor }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      id={labelFor}
      label={labelText}
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
    />
  );
};

export default InputType;

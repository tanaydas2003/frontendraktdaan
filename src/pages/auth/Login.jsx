// src/pages/Login.js
import React from 'react';
import Form from '../../components/shared/Form/Form';
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FormBanner = styled('div')({
  backgroundColor: '#f5f5f5',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FormImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '100vh',
  objectFit: 'cover',
});

const Login = () => {
  // const {loading, error} = useSelector(state => state.auth)

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item md={8} sx={{ display: { xs: 'none', md: 'block' } }}>
        <FormBanner>
          <FormImage src="./assets/images/banner1.jpg" alt="Login Banner" />
        </FormBanner>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        <Box sx={{ width: '80%', maxWidth: 400 }}>
          <Form formTitle="Login Page" submitBtn="Login" formType="login" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

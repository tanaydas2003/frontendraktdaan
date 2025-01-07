// src/pages/Login.js
import React from 'react';
import Form from '../../components/shared/Form/Form';
import { Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';  // Import RouterLink for navigation

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
    <>
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
            <Form formTitle="Login" submitBtn="Login" formType="login" />
            {/* Back to Homepage Button */}
            <Button
              component={RouterLink}
              to="https://rakdtdaann.netlify.app/"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Back to Homepage
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../../services/API";
import {toast} from 'react-toastify';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
      try {
        const { data } = await API.post('/auth/login', { role, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          toast.success(data.message);
          window.location.replace('/home');
        }
        return data;
      } catch (error) {
        let errorMessage;
        if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );

export const userRegister = createAsyncThunk('auth/register', 
async({name,
    role,
    email,
    password,
    phone,
    organisationName,
    address,
    hospitalName,
    website,}, {rejectWithValue}) =>{
        try {
            const {data}  = await API.post('/auth/register',{name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName,
                website,
            }
            )
            if(data?.success){
                // alert("User Registerd Sucessfully");
                window.location.replace('/login');
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }
            else{
                return rejectWithValue(error.message)
            }
        }
});

//Current User
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async({rejectWithValue}) =>{
        try {
            const res = await API.get('/auth/current-user')
            if(res?.data){
                return res?.data;
            }
        } 
        catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }
            else{
                return rejectWithValue(error.message)
            }
        }
    }
)
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import API from '../../services/API';
import { getCurrentUser } from '../../redux/features/auth/authAction';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const dispatch  = useDispatch();
    const getUser = async () =>{
        try {
            const {data} = await API.get('/auth/current-user')
            if(data?.success){
                dispatch(getCurrentUser(data))
            }
        } 
        catch (error) {
            localStorage.clear() // if there is error token will get automatically delete of current user and he will be log out
            console.log(error);
        }
    }
    useEffect(() =>{
        getUser()
    })
    if(localStorage.getItem('token')){
        return children
    }
    else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute
